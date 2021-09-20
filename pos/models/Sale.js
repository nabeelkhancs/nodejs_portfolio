const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
	{
		product: [{
			productId: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'product'
			},
			pricePerUnit: Number,
			quantity: Number,
		}],
		customerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'customer'
		},
		addedBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user'
		},
		locationId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'location'
		},
		referenceNote: String,
		discount: Number,
		paymentType: {
			type: String,
			enum: ['cash', 'credit']
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('sale', salesSchema);	