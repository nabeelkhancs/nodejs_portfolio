const Permission = require('../models/Permission');
const access_levels = require('../helpers/access_levels');


module.exports.permissions_get = async (req, res, next) => {
	const permissions = await Permission.find();

	res.render('permissions/list', {
		permissions: JSON.parse(JSON.stringify(permissions)).map(x => ({
			...x,
			permissions: access_levels.filter(y => x.permissions.includes(y.code)).map(z => z.name).join(", ")
		})),
	});
}

module.exports.addPermissions_get = async (req, res, next) => {
	console.log("hekki")
	res.locals = {
		...res.locals,
		page: 'permissions/add',
		pageData: {
			access_levels,
			pageName: 'permissionsList'
		},
		status: 200,
		data: access_levels
	}
	next();

}

module.exports.addPermissions_post = async (req, res, next) => {
	const name = req.body.name ? req.body.name.trim() : "";
	const description = req.body.description ? req.body.description.trim() : "";
	const permissions = req.body.permissions ? req.body.permissions.trim() : "";
	// console.log(permissions);
	const newPermission = new Permission({
		name,
		description,
		permissions: permissions.split(",")
	});

	await newPermission.save();

	res.locals = {
		...res.locals,
		flash: 'Role And Permissions Added Successfuly',
		redirect: '/permissions',
		status: 200
	}
	next();
}


module.exports.editPermissions_get = async (req, res, next) => {
	const id = req.params.id;
	const permissions = await Permission.findById(id);
	// console.log(permissions.permissions);
	res.locals = {
		...res.locals,
		page: 'permissions/edit',
		pageData: {
			permissions,
			access_levels
		},
		status: 200,
		data: {
			permissions,
			access_levels
		}
	}
	next();
}

module.exports.updatePermissions_post = async (req, res, next) => {
	const id = req.body.id;
	const name = req.body.name ? req.body.name.trim() : "";
	const description = req.body.description ? req.body.description.trim() : "";
	const permissions = req.body.permissions ? req.body.permissions.trim() : "";

	let updatePermission = {
		name,
		description,
		permissions:permissions.split(",") 
	}
	
	await Permission.findByIdAndUpdate(id, updatePermission);

	res.locals = {
		...res.locals,
		flash: "Role And Permissions Updated Successfuly",
		redirect: "/permissions",
		status:200
	}
	next();
}

module.exports.deletePermissions_get = async (req, res, next) => {
	id = req.params.id;

	await Permission.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		flash: "Role And Permissions Deleted Successfully",
		redirect: "/permissions",
		status: 200
	}
	next();
}