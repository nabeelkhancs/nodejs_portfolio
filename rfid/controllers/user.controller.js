const validator = require('validator');
const stripe = require('stripe');
const User = require('../models/User');

module.exports.users_get = async (req, res) => {
  const users = await User.find();

  res.render('users', {
    users
  })
};

module.exports.register_post = async (req, res) => {
  // Fetch Data from Request
  const errors = [];
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const role = req.body.role ? req.body.role.trim() : '';
  const confirm = req.body.confirm ? req.body.confirm.trim() : '';
  const fullName = req.body.fullName ? req.body.fullName.trim() : '';

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
    const users = await User.find({ isAdmin: false });
    return res.render('users', {
      users,
      errors
    })
  }

  // Processing
  const newUser = new User({
    fullName,
    email,
    role,
    password
  });
  await newUser.save();

  req.flash('success_msg', 'User Added');
  res.redirect('/users');
};


module.exports.edituser_get = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    const users = await User.find({ isAdmin: false });

    req.flash("error_msg", "Cannot Find User");
    res.render('users', {
      users
    })
  }

  res.render('edit-user', {
    user
  })
};

module.exports.users_put = async (req, res) => {
  const errors = [];
  const id = req.body.id ? req.body.id.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const confirm = req.body.confirm ? req.body.confirm.trim() : '';
  const fullName = req.body.fullName ? req.body.fullName.trim() : '';

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

  let updateObject = { email, fullName };
  if (!validator.isEmpty(password)) updateObject.password = password;

  await User.findByIdAndUpdate(id, updateObject);

  req.flash('success_msg', 'User Updated');
  res.redirect('/users');
}

module.exports.deleteuser_get = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  await stripe.customers.del(deletedUser.stripeCustomerId);

  req.flash('success_msg', 'User Deleted');
  res.redirect('/users');
};