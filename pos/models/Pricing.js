const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'product'
		},
		pricingType: {
			type: String,
			enum: ['amount', 'percentage']
		},
		price: Number
	},
	{ timestamps: true}
);

module.exports = mongoose.model('pricing', pricingSchema);
