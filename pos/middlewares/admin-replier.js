module.exports = (req, res) => {
	if (!res.locals.status) return res.json({ status: 400, data: "No Locals Found in Replier!" });
	if (res.locals.flash) req.flash(res.locals.status === 200 ? "success_msg" : "error_msg", res.locals.flash);
	if (res.locals.redirect) return res.redirect(res.locals.redirect);

	res.render(res.locals.page, {
		...res.locals.pageData,
		errors: res.locals.errors
	});
}