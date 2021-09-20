const passport = require('passport');
const Inventory = require('../models/Inventory');
// const Use

module.exports.admin_get = async (req, res, next) => {

  res.render('index');

};

module.exports.forbidden = (req, res, next) => {
  res.render('forbidden');
};

// GET - Show admin sign in page
module.exports.login_get = (req, res, next) => {
  res.render('login');
};

// POST - admin sign in
module.exports.login_post = (req, res, next) => {
  // console.log(req.body);
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

