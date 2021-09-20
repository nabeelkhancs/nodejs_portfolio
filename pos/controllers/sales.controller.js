const validator = require('validator');
const Sale = require('../models/Sale');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Pricing = require('../models/Pricing');
const Inventory = require('../models/Inventory');
const { countDocuments } = require('../models/Sale');

module.exports.pos_get = async (req, res, next) => {
	const currentUser = req.user;
	let [customers, products, pricings] = await Promise.all([Customer.find(), Product.find(), Pricing.find()]);
	res.locals = {
		...res.locals,
		page: 'sales/pos',
		pageData: {
			currentUser,
			pricings,
			customers,
			products,
			pageName: 'pos'
		},
		status: 200,
		data: {
			currentUser,
			pricings,
			customers,
			products
		}
	}
	next();
}

module.exports.autoComplete = async (req, res, next) => {

	var regex = new RegExp(req.query["term"], 'i');
	var productFilter = Product.find({ name: regex }).sort({ 'updated_at': -1 }).limit(20);
	// console.log(JSON.parse(JSON.stringify(productFilter)));
	productFilter.exec(function (err, data) {
		var result = [];
		if (!err) {
			if (data && data.length && data.length > 0) {
				data.forEach(product => {
					let obj = {
						id: product._id,
						label: product.name + " - " + product.barcode
					};
					result.push(obj);
				});
			}
			// console.log(result);
			res.jsonp(result);
		}
	});
}


module.exports.salesAdd = async (req, res, next) => {
	var customerId = req.body.customerId ? req.body.customerId : "";
	var referenceNote = req.body.referenceNote ? req.body.referenceNote : "";
	var discount = req.body.discount ? req.body.discount : "";
	var paymentType = req.body.paymentType ? req.body.paymentType : "";
	var product = req.body.product ? req.body.product : "";
	var addedBy = req.body.addedBy ? req.body.addedBy : "";
	var locationId = req.body.locationId ? req.body.locationId : "";

	const newProducts = product.map(({ name, ...keep }) => keep); //remove name from array

	let sale = {
		product: newProducts,
		referenceNote,
		discount,
		addedBy,
		locationId,
		paymentType
	}

	for (let i = 0; i < newProducts.length; i++) {
		await Inventory.updateOne(
			{ productId: newProducts[i].productId, locationId },
			{ $inc: { stock: (-1) * (newProducts[i].quantity) } }
		)
	}

	if (customerId)
		sale.customerId = customerId;


	const newSale = new Sale(sale);

	await newSale.save(); // Save into db

	//response
	res.locals = {
		...res.locals,
		redirect: '/sales/printslip/' + newSale.id,
		status: 200
	}
	next();
}

module.exports.printSlip_get = async (req, res, next) => {
	id = req.params.id;
	const sale = await Sale.findById(id).populate('product.productId');
	// console.log(sale.product[0].productId);
	res.locals = {
		...res.locals,
		page: 'sales/printSlip',
		pageData: {
			sale
		},
		status: 200,
		data: sale
	}
	next();
}

module.exports.sales_get = async (req, res, next) => {
	const where = {};
	const currentUser = req.user;
	
	if (!currentUser.isAdmin) where.locationId = currentUser.locationId;

	const sales = await Sale.find(where).populate('customerId').populate('productId').populate('locationId');

	res.locals = {
		...res.locals,
		page: 'sales/list',
		pageData: {
			sales,
			currentUser
		},
		status: 200,
		data: {
			sales,
			currentUser
		}
	}
	next();

}

module.exports.deleteSale_get = async (req, res, next) => {

	id = req.params.id;
	await Sale.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		redirect: '/sales/',
		flash: "Sale Delete Successfully",
		status: 200
	}

}