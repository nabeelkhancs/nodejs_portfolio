const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
	{
		name: String,
		address: String,
		locationType: {
			type: String,
			enum: ['physical', 'digital']
		},
		storeLink: String,
		consumer_key: String,
		consumer_secret: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('location', locationSchema);