const validator = require('validator');
const Supplier = require('../models/Supplier');


module.exports.suppliers_get = async (req, res, next) => {
	const suppliers = await Supplier.find();

	res.locals = {
		...res.locals,
		page: 'peoples/suppliers',
		pageData: {
			suppliers,
			pageName: 'suppliers'

		},
		status: 200,
		data: suppliers
	}
	next();
}

module.exports.supplier_post = async (req,res,next) => {
	
	const errors = [];
	const name = req.body.name ? req.body.name.trim() : "";
	const contactName = req.body.contactName ? req.body.contactName.trim() : "";
	const contactNumber = req.body.contactNumber ? req.body.contactNumber.trim() : "";
	const email = req.body.email ? req.body.email.trim() : "";
	const address = req.body.address ? req.body.address.trim() : "";

	if(validator.isEmpty(name)){
		errors.push({ msg: 'Name is required' });
	}

	if(errors.length) {
		
		res.locals = {
			...res.locals,
			page: 'peoples/supplier',
			pageData: {
				errors,
				pageName: 'suppliers'
			},
			status: 400,
			data: errors[0].msg,
			errors
		}
		return next();
	}

	//Processing

	const newSupplier = new Supplier({
		name,
		contactName,
		contactNumber,
		email,
		address
	}); 

	await newSupplier.save();

	res.locals = {
		...res.locals,
		flash: 'Supplier Added',
		redirect: '/suppliers',
		status:200,
	}
	next();
}

module.exports.supplier_delete = async (req, res, next) => {
	const id = req.params.id;

	await Supplier.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		flash: 'Supplier Deleted Successfuly',
		redirect: '/suppliers',
		status:200
	}
	next();
}