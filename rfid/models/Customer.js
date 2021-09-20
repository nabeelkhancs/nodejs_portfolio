const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
	{
		name: String,
		phone: String,
		address: String,
		idNumber: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('customer', customerSchema);