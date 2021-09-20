const Location = require('../models/Location');
const Product = require('../models/Product');
const validator = require('validator');

module.exports.addLocation_get = async (req, res, next) => {
	res.locals = {
		...res.locals,
		page: 'locations/add',
		status: 200
	}
	next();
}

module.exports.addLocation_post = async (req, res, next) => {

	// body data
	const name = req.body.name ? req.body.name.trim() : ""; 
	const type = req.body.type ? req.body.type.trim() : ""; 
	const address = req.body.address ? req.body.address.trim() : ""; 
	const store_link = req.body.store_link ? req.body.store_link.trim() : ""; 
	const consumer_key = req.body.consumer_key ? req.body.consumer_key.trim() : ""; 
	const consumer_secret = req.body.consumer_secret ? req.body.consumer_secret.trim() : ""; 

	const errors = []; 

	console.log(type);

	//validation
	if(validator.isEmpty(name) || validator.isEmpty(type) ){
		
		errors.push("Name and Type both are required");

		res.locals = {
			...res.locals,
			page: 'locations/add',
			errors
		}
	}

	let location = {
		name,
		locationType: type,
	}

	if(!validator.isEmpty(address))  location.address = address;
	if(!validator.isEmpty(store_link))  location.store_link = store_link;
	if(!validator.isEmpty(consumer_key))  location.consumer_key = consumer_key;
	if(!validator.isEmpty(consumer_secret))  location.consumer_secret = consumer_secret;

	//add data 

	const newLocation = new Location(location);

	await newLocation.save();

	res.locals = {
		...res.locals,
		redirect: '/locations/',
		flash: "Location Added Succeddfully",
		status:200
	}
	next();

}

module.exports.allLocations_get = async (req, res, next) => {
	
	const locations = await Location.find();

	res.locals = {
		...res.locals,
		page: 'locations/list',
		pageData: {
			locations
		},
		status:200,
		data: locations
	}
	next();

}

module.exports.deleteLocation_get = async (req, res, next) => { 
	
	const id = req.params.id;
	await Location.findByIdAndDelete(id);

	res.locals = {
		...res.locals,
		redirect: "/locations",
		status: 200,
		flash: "Location Deleted Successfuly"
	}
	next();

}

module.exports.editLocation_get = async (req, res, next) => {
	
	id = req.params.id;
	const location = await Location.findById(id);

	res.locals = {
		...res.locals,
		page: 'locations/edit',
		pageData: {
			location
		},
		status: 200,
		data: location
	}
	next();

}

module.exports.updateLocation_post = async (req, res, next) => {

	// body data
	const id = req.body.id;
	const name = req.body.name ? req.body.name.trim() : ""; 
	const type = req.body.type ? req.body.type.trim() : ""; 
	const address = req.body.address ? req.body.address.trim() : ""; 
	const store_link = req.body.store_link ? req.body.store_link.trim() : ""; 
	const consumer_key = req.body.consumer_key ? req.body.consumer_key.trim() : ""; 
	const consumer_secret = req.body.consumer_secret ? req.body.consumer_secret.trim() : ""; 

	let updateLocation = {
		name,
		locationType: type,
	}

	//validation
	if(validator.isEmpty(name) || validator.isEmpty(type) ){
		
		errors.push("Name and Type both are required");

		res.locals = {
			...res.locals,
			page: 'locations/add',
			errors
		}
	}

	if(!validator.isEmpty(address))  updateLocation.address = address;
	if(!validator.isEmpty(store_link))  updateLocation.store_link = store_link;
	if(!validator.isEmpty(consumer_key))  updateLocation.consumer_key = consumer_key;
	if(!validator.isEmpty(consumer_secret))  updateLocation.consumer_secret = consumer_secret;

	await Location.findByIdAndUpdate(id, updateLocation);

	res.locals = {
		...res.locals,
		redirect: "/locations",
		status: 200,
		flash: "Location Updated Successfuly"
	}
	next();

}

module.exports.locationTransfer_get = async (req, res, next) => {
	const locations = await Location.find();
	const products = await Product.find();
	res.locals = {
		...res.locals,
		page: 'locations/transfer',
		pageData: {
			locations,
			products
		},
		status:200,
		data: {
			locations,
			products	
		}
	}
	next();
}

module.exports.locationTransfer_post = async (req, res, next) => {

	
	const errors = [];
	
	const fromLocation = req.body.fromLocationId;
	const toLocation = req.body.toLocationId;
	const product = req.body.productId;
	const quantity = req.body.quantity ? req.body.quantity.trim() : "";
	
	const locationFromName = await Location.findById({ fromLocation });
	const locations = await Location.find();
	const products = await Product.find();

	let fromLocationExists = await Inventory.find({ productId: product, locationId: fromLocation });
	if(!fromLocationExists){
		errors.push("No Inventory on " + locationFromName.name + " ");
		res.locals = {
			...res.locals,
			page: 'locations/transfer',
			pageData: {
				locations,
				products,
				errors
			}
		}
		next();
	}

	let toLocationExists = await Inventory.find({ productId: product, locationId: toLocation });
	if(toLocationExists.length > 0){
		
	}
	
}