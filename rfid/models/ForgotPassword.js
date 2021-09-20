const mongoose = require('mongoose');

// Create Post Schema
const forgotPasswordSchema = new mongoose.Schema(
  {
    user: {
    	type: mongoose.SchemaTypes.ObjectId,
			ref: 'user'
    },
    verificationCode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('forgot-password', forgotPasswordSchema);