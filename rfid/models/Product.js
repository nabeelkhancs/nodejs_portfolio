const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: String,
		categoryId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'product-category'
		},
		description: String,
		// image: String
	},
	{ timestamps: true }
);


module.exports = mongoose.model('product', productSchema);