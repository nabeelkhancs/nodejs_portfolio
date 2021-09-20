const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema(
	{
		name: String,
		description: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('product-category', productCategorySchema);