const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
	{
		name: String,
		contactName: String,
		contactNumber: String,
		address: String,
		email: String,
	},
	{ timestamps:true }
);

module.exports  = mongoose.model('customer', customerSchema);