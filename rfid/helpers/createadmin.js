const User = require('../models/User');

module.exports = async () => {
  const newAdmin = new User({
    fullName: 'Admin',
    email: 'admin@admin.com',
    role: 'admin',
    password: 'admin',
  });
  await newAdmin.save();
  return;
};
