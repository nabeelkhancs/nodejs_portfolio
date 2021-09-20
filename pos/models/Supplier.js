const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
	{
		name: String,
		contactName: String,
		contactNumber: String,
		address: String,
		email: String,
	},
	{ timestamps:true }
);

module.exports  = mongoose.model('supplier', supplierSchema);