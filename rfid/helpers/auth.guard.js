let allowOnly = (roles) => {
	return (req, res, next) => {
		let isMatch = roles.includes(req?.user?.role);
		console.log("GUARD: ▼", req?.user?.role, " | ▲", roles, " - ", isMatch);
		if (isMatch) return next();
		else return res.redirect('/login');
	}
}

module.exports = allowOnly;