const jwt = require('jsonwebtoken');
const generateToken = require('../helpers/generatetoken');

module.exports.login_post = async function (req, res, next) {
  return res.status(200).json({ status: 200, data: generateToken(req.user) });
};

module.exports.me_get = (req, res, next) => {
  return res.status(200).json({ status: 200, data: req.user });
};
