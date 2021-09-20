module.exports = (req, res) => {
	if (!res.locals.status) return res.json({ status: 400, data: "No Locals Found in API Replier!" });

	res.json({ status: res.locals.status,
		data: (res.locals.data) ? ((res.locals.data instanceof Array) ? [...res.locals.data] : res.locals.data) : undefined
	});
}