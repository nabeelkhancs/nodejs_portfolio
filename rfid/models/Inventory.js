const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
	{
		stockId: String,
		rfid: String,
		recievedDate: Date,
		washingDate: Date,
		dyingDate: Date,
		shippedDate: Date,
		shippedTo: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'customer'
		},
		status: {
			type: String,
			enum: ['recieved', 'washing', 'dying',	'shipped'	]
		}
	},
	{ timestamps:true }
);

module.exports = mongoose.model('inventory', inventorySchema);