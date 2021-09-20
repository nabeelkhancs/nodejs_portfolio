const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'product'
		},
		stock: Number,
		locationId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'location'
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('inventory', inventorySchema);