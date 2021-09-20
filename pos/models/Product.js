const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: String,
		barcode: {
			type: String,
			unique: true
		},
		categoryId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'product-category'
		},
		unitOfMeasure: String,
		alertQuantity: Number,
		image: String
	},
	{ timestamps: true }
);


module.exports = mongoose.model('product', productSchema);