const passport = require('passport');
const Inventory = require('../models/Inventory');
// const Use

module.exports.admin_get = async (req, res, next) => {
  let role = req.user.role;
  let startDate = new Date();
  let endDate = new Date();
  startDate.setHours(0,0,0,0)
  endDate.setHours(23,59,59,99);
  inventories = await Inventory.find();
  const recievedCount = await Inventory.countDocuments({ status: 'recieved', recievedDate: { $gte:startDate, $lte: endDate } });
  const washingCount = await Inventory.countDocuments({ status: 'washing', washingDate: { $gte:startDate, $lte: endDate } });
  const dyingCount = await Inventory.countDocuments({ status: 'dying', dyingDate: { $gte:startDate, $lte: endDate } });
  const shippedCount = await Inventory.countDocuments({ status: 'shipped', shippedDate: { $gte:startDate, $lte: endDate } });
  if(role == 'subadmin'){
    res.render('index2', {
      inventories,
      recievedCount,
      washingCount,
      dyingCount,
      shippedCount
    });
  } else {
    res.render('index', {
      inventories,
      recievedCount,
      washingCount,
      dyingCount,
      shippedCount
    });
  }
};

// GET - Show admin sign in page
module.exports.login_get = (req, res, next) => {
  res.render('login');
};

// POST - admin sign in
module.exports.login_post = (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
};

// GET - admin sign out
module.exports.logout_get = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are Logged out!');
  res.redirect('/login');
};

