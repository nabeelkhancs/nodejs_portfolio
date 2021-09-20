const access_levels = require('../helpers/access_levels');
const Permission = require('../models/Permission');
const Location = require('../models/Location');

module.exports.dynamicSidebar = async (req, res, next) => {
	id = req.user.roleId;
	const roles = await Permission.findById(id);
	const locations = await Location.find();
	
	const permissions = roles.permissions;
	// console.log(permissions);
	
	const parentSidebar = access_levels.filter(function(item){
		return(item.code[1] === '0' && item.code[2] === '0' && permissions.includes(item.code));
	});
	
	const childSidebar = access_levels.filter(function(item){
		return(!(item.code[1] === '0'  && permissions.includes(item.code)) && item.code[2] === '0');
	});
	
	for(let i = 0; i < parentSidebar.length; i++){
		var parent = parentSidebar[i];
		let child = [];
		for(let j = 0; j < childSidebar.length; j++){
			if(childSidebar[j].code[0] == i){
				child.push(childSidebar[j]);
			}
		}	
		parent.child = child;
	}
	// parentSidebar = 
	// console.log(JSON.stringify(parentSidebar));
	res.locals = {
		...res.locals,
		parentSidebar: parentSidebar.filter(x => x.code != '000'),
		currentUser: req.user,
		locations
	}
	next();
}
