const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		permissions: [String],
	}
);

module.exports = mongoose.model('permission', permissionSchema);