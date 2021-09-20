const validator = require('validator');
const Purchase = require('../models/Purchase');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const Location = require('../models/Location');

module.exports.purchases_get = async (req, res, next) => {
	// const purchases = await Purchase.find().populate('supplierId').populate('productId');
	const currentUser = req.user;
	const where = {};

	if(!currentUser.isAdmin) where.locationId = currentUser.locationId;

	const purchases = await Purchase.aggregate([
		{
			$match: where
		},
		{
			$lookup: {
				from: 'suppliers',
				localField: 'supplierId',
				foreignField: '_id',
				as: 'supplierId'
			}
		},
		{ $unwind: '$supplierId' },
		{
			$lookup: {
				from:'locations',
				localField: 'locationId',
				foreignField: '_id',
				as: 'locationId'
			}
		},
		{ $unwind: '$locationId' },
		{
			$project: {
				_id: '$_id',
				totalAmount: {
					$sum: {
						$map: {
							input: { $range: [0, { "$size": "$product.pricePerUnit" }] },
							as: "iter",
							in: {
								$let: {
									vars: {
										price: { "$arrayElemAt": ["$product.pricePerUnit", "$$iter"] },
										quantity: { "$arrayElemAt": ["$product.quantity", "$$iter"] },
									},
									in: { $multiply: ["$$price", "$$quantity"] }
								}
							}
						}
					}
				},
				product: '$product',
				prices: '$product.pricePerUnit',
				date: '$date',
				reference: '$reference',
				description: '$description',
				supplierId: '$supplierId',
				locationId: '$locationId',
				createdAt: '$createdAt'
			}
		},
		{
			$sort: {
				createdAt: -1
			}
		}
	]);
	res.locals = {
		...res.locals,
		page: 'purchases/list',
		pageData: {
			purchases,
			pageName: 'purchasesList'
		},
		status: 200,
		data: purchases
	}
	next();
}

module.exports.addPurchases_get = async (req, res, next) => {

	let [products, suppliers] = await Promise.all([Product.find(), Supplier.find()]);
	if(req.user.isAdmin)
		var locations = await Location.find();
	else
		var locations = await Location.find({ _id: req.user.locationId });

		// console.log(locations);

	res.locals = {
		...res.locals,
		page: 'purchases/add',
		pageData: {
			products,
			suppliers,
			locations,
			pageName: 'addPurchase'
		},
		status: 200,
		data: {
			products,
			suppliers,
			locations
		}
	}
	next();
}

module.exports.addPurchases_post = async (req, res, next) => {

	//purchases for the all purchase list
	// const purchases = await Purchase.find().populate('supplierId').populate('productId');

	//body data
	const supplierId = req.body.supplierId ?? "";
	const locationId = req.body.locationId ?? "";
	const date = req.body.date?.trim() ?? "";
	const reference = req.body.reference?.trim() ?? "";
	const description = req.body.description?.trim() ?? "";
	const purchaseData = req.body.purchaseData;

	//remove barcode from object
	const newPurchaseData = purchaseData.map(({ barcode, ...keep }) => keep);

	// add values in purchase
	const newPurchase = new Purchase({
		product: newPurchaseData,
		date,
		reference,
		description,
		supplierId,
		locationId
	});
	
	for(i= 0; i < newPurchaseData.length; i++ ){
			id = newPurchaseData[i].productId;
		let locationExists = await Inventory.find({ productId: id, locationId: locationId });
		if(locationExists.length > 0){
			// console.log("not empty");
				{ productId: id, locationId },
				{ $inc: { stock: newPurchaseData[i].quantity } }
			);
		}else{
			// console.log("empty");
			const newInventory = new Inventory({
				productId: id,
				stock: newPurchaseData[i].quantity,
				locationId
			});
			await newInventory.save();
		}
	}
	
	// console.log(newPurchase);

	await newPurchase.save(); //add purchase

	//response
	res.locals = {
		...res.locals,
		redirect: '/purchases',
		status: 200
	}
	next();
}

module.exports.deletePurchase_get = async (req, res, next) => {
	const id = req.params.id;
	await Purchase.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		flash: 'Purchase Data Deleted Successfuly',
		redirect: '/purchases',
		status: 200
	}
	next();
}

module.exports.printPurchase_get = async (req, res, next) => {
	const id = req.params.id;
	const purchase = await Purchase.findById(id).populate('product.productId').populate('supplierId');

	res.locals = {
		...res.locals,
		page: 'purchases/print',
		pageData: {
			purchase
		},
		status: 200,
		data: purchase
	}
	next();
}