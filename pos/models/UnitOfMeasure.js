const mongoose = require('mongoose');

const unitOfMeasureSchema = mongoose.Schema(
	{
		name: String,
		description: String
	},
	{ timestamps: true }
);

module.exports = new mongoose.model('unit-of-measure',unitOfMeasureSchema);