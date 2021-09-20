const mongoose = require('mongoose');

const autoGeneratedStockIdSchema = new mongoose.Schema(
	{
		stockId: String,
		date: Date
	},
	{ timestamps: true }
);


module.exports = mongoose.model('auto-generated-stockId', autoGeneratedStockIdSchema);