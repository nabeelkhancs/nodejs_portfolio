const mongoose = require('mongoose');
const User = require('../models/User');
const createAdmin = require('../utils/createAdmin');

module.exports = () =>
	new Promise(async (resolve, reject) => {
		try {
			// Connect to MongoDB
			await mongoose.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			});

			// mongoose.set('debug', true);
			console.log('CONFIG: Database Connected');
			const admin = await User.findOne({ isAdmin: true });
			if (!admin) {
				console.log('Admin User not found. Making now');
				await createAdmin();
			}

			resolve(true);
		} catch (error) {
			console.log('CONFIG: Database Connection Error, ', error);
			reject(error);
		}
	});
