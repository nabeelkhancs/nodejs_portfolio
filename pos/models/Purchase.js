const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
	{
		product: [{
			productId: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'product'
			},
			pricePerUnit: Number,
			quantity: Number
		}],
		date: Date,
		reference: String,
		description: String,
		supplierId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'supplier'
		},
		locationId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'location'
		}
	},
	{ timestamps:true }
);

module.exports = mongoose.model('purchase', purchaseSchema);