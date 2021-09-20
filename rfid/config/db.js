const mongoose = require('mongoose');
const User = require('../models/User');
const createAdmin = require('../helpers/createadmin');

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
      console.log('MongoDB Connected...');
      const admin = await User.findOne({ role: 'admin' });
      if (!admin) {
        console.log('Admin User not found. Making now');
        await createAdmin();
      }

      resolve(true);
    } catch (error) {
      console.log('MongoDB Connection Error: ', error);
      reject(error);
    }
  });
