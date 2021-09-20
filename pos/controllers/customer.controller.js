const validator = require('validator');
const Customer = require('../models/Customer');


module.exports.customers_get = async (req, res, next) => {
	const customers = await Customer.find();

	res.locals = {
		...res.locals,
		page: 'peoples/customers',
		pageData: {
			customers,
			pageName: 'customers'

		},
		status: 200,
		data: customers
	}
	next();
}

module.exports.customer_post = async (req,res,next) => {
	
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
			page: 'peoples/customers',
			pageData: {
				errors,
				pageName: 'customers'
			},
			status: 400,
			data: errors[0].msg,
			errors
		}
		return next();
	}

	//Processing

	const newCustomer = new Customer({
		name,
		contactName,
		contactNumber,
		email,
		address
	}); 

	await newCustomer.save();

	res.locals = {
		...res.locals,
		flash: 'Customer Added',
		redirect: '/customers',
		status:200,
	}
	next();
}

module.exports.customer_delete = async (req, res, next) => {
	const id = req.params.id;

	await Customer.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		flash: 'Customer Deleted Successfuly',
		redirect: '/customers',
		status:200
	}
	next();
}