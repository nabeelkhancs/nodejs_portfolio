const Permission = require('../models/Permission');

let allowAccess = (pathCode) => {
	return async (req, res, next) => {
		console.log(req.user);
		if(!req.user)
			return res.redirect('/login');
		let id = req.user.roleId;
		let permission = await Permission.findOne({ _id: id, permissions: pathCode });
		// console.log(permission);
		// console.log(id);
		if (permission) return next();
		else return res.redirect('/forbidden');
	}
}

module.exports = allowAccess;