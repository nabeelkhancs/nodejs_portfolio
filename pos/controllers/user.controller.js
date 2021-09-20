const validator = require('validator');
const User = require('../models/User');
const Permission = require('../models/Permission');
const Location = require('../models/Location');

module.exports.users_get = async (req, res) => {
  const users = await User.find().populate('roleId').populate('locationId');
  const permissions = await Permission.find();
  const locations = await Location.find();
  res.render('users/users', {
    permissions,
    locations,
    users
  })
};

module.exports.register_post = async (req, res) => {
  // Fetch Data from Request
  const errors = [];
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const roleId = req.body.roleId ? req.body.roleId.trim() : '';
  const confirm = req.body.confirm ? req.body.confirm.trim() : '';
  const fullName = req.body.fullName ? req.body.fullName.trim() : '';
  const locationId = req.body.locationId ? req.body.locationId.trim() : '';

  // Validation
  if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(fullName)) {
    errors.push({ msg: 'fullName, email and password are required' });
  }
  if (!validator.isEmail(email)) errors.push({ msg: 'Email is not valid' });
  if (!validator.isByteLength(password, { min: 6 })) errors.push({ msg: 'Password must be at least 6 characters' });
  if (!validator.equals(password, confirm)) errors.push({ msg: 'Passwords don\'t match ' });
  let user = await User.findOne({ email });
  if (user) {
    errors.push({ msg: 'Email already registered' });
  }

  if (errors.length) {
    const users = await User.find().populate('roleId');
    const permissions = await Permission.find();
    const locations = await Location.find();
    return res.render('users/users', {
      users,
      permissions,
      locations,
      errors
    });
  }

  // Processing
  const newUser = new User({
    fullName,
    email,
    roleId,
    locationId,
    password
  });
  await newUser.save();

  req.flash('success_msg', 'User Added');
  res.redirect('/users');
};


module.exports.edituser_get = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const permissions = await Permission.find();
  const locations = await Location.find();
    

  if (!user) {
    const users = await User.find({ isAdmin: false });

    req.flash("error_msg", "Cannot Find User");
    res.render('users/users', {
      users,
      permissions,
      locations
    })
  }

  res.render('users/edit-user', {
    user,
    permissions,
    locations
  })
};

module.exports.users_put = async (req, res) => {
  const errors = [];
  const id = req.body.id ? req.body.id.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const confirm = req.body.confirm ? req.body.confirm.trim() : '';
  const fullName = req.body.fullName ? req.body.fullName.trim() : '';
  const roleId = req.body.roleId ? req.body.roleId.trim() : '';
  const locationId = req.body.locationId ? req.body.locationId.trim() : '';

  // Validation
  if (validator.isEmpty(email) || validator.isEmpty(fullName)) {
    errors.push({ msg: 'fullName, email and password are required' });
  }
  if (!validator.isEmail(email)) errors.push({ msg: 'Email is not valid' });
  if (!validator.isEmpty(password)) {
    if (!validator.isByteLength(password, { min: 6 })) errors.push({ msg: 'Password must be at least 6 characters' });
    if (!validator.equals(password, confirm)) errors.push({ msg: 'Passwords don\'t match ' });
  }
  const user = await User.findOne({ _id: { $ne: id }, email });
  if (user) {
    errors.push({ msg: 'Email already registered' });
  }

  if (errors.length) {
    const users = await User.find({ isAdmin: false });
    return res.render('users', {
      users,
      errors
    })
  }

  let updateObject = { email, fullName, roleId, locationId };
  if (!validator.isEmpty(password)) updateObject.password = password;

  await User.findByIdAndUpdate(id, updateObject);

  req.flash('success_msg', 'User Updated');
  res.redirect('/users');
}

module.exports.deleteuser_get = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  req.flash('success_msg', 'User Deleted');
  res.redirect('/users');
};