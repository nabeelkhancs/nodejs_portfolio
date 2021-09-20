const Customer = require('../models/Customer');

module.exports.customers_get = async (req, res) => {
	customers = await Customer.find();
	res.render('customers/list', {
		customers
	});
}

module.exports.addCustomer_get = async (req, res) => {
	res.render('customers/add');
}
module.exports.addCustomer_post = async (req, res) => {
	const name = req.body.name ? req.body.name : "";
	const phone = req.body.phone ? req.body.phone : "";
	const address = req.body.address ? req.body.address : "";
	const idNumber = req.body.idNumber ? req.body.idNumber : "";

	const newCustomer = new Customer(
		{
			name,
			phone,
			address,
			idNumber
		}
	);

	await newCustomer.save();
	req.flash('success_msg', 'Customer Added Successfully');
	res.redirect('/customers');

}

module.exports.editCustomer_get = async (req, res) => {
	id = req.params.id;
	customer = await Customer.findById(id);

	res.render('customers/edit', {
		customer
	});

}

module.exports.updateCustomer_post = async (req, res) => {
	const id = req.body.id;
	const name = req.body.name ? req.body.name : "";
	const phone = req.body.phone ? req.body.phone : "";
	const address = req.body.address ? req.body.address : "";
	const idNumber = req.body.idNumber ? req.body.idNumber : "";

	let updateCustomer = {
		name,
		phone,
		address,
		idNumber
	}

	await Customer.findByIdAndUpdate(id,updateCustomer);
	req.flash('success_msg', 'Customer Updated Successfully');
	res.redirect('/customers/');
}

module.exports.deleteCustomer_get = async (req, res) => {
	id = req.params.id;
	await Customer.findByIdAndDelete(id);
	req.flash('success_msg', 'Customer Deleted Successfully');
	res.redirect('/customers/');
}