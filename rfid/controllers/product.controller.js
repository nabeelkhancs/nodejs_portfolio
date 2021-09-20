const validator = require('validator');
const path = require('path');
const Product = require('../models/Product');
const ProductCategories = require('../models/ProductCategory');
const uuid = require('uuid').v1;



module.exports.products_get = async (req, res) => {
	const products = await Product.find().populate('categoryId');
	res.render('products/list', {
		products,
		pageName: 'productList'
	})
}

module.exports.addProduct_get = async (req, res) => {
	const categories = await ProductCategories.find();
	res.render('products/add', {
		categories,
		pageName: 'addProducts'
	});
}


module.exports.products_post = async (req, res) => {

	const error = [];
	const name = req.body.name ? req.body.name.trim() : '';
	const categoryId = req.body.categoryId ? req.body.categoryId.trim() : '';
	const description = req.body.description ? req.body.description.trim() : '';

	// Validaton
	if (validator.isEmpty(name)) {
		error.push({ msg: 'Name is required' });
	}

	if (error.length) {

		const products = await Product.find(); 
		const categories = await ProductCategories.find(); 
		
		res.render('products/add', {
			error,
			products,
			categories,
			pageName: 'addProducts'
		});
	}

	// Image Handling
	// const fileExtension = /\.[0-9a-z]{1,5}$/i.exec(req.files.image.name)[0];
	// const fileName = uuid();
	// const fullFileName = fileName + fileExtension;
	// const iconPath = path.resolve(__dirname, `../public/img/products/${fullFileName}`);

	// req.files.image.mv(iconPath, async (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 		res.redirect('/products/add');
	// 	} else {
			// Processing
			const newProduct = new Product({
				name,
				categoryId,
				description,
			});
		

			await newProduct.save();
			const categories = await ProductCategories.find(); 
			
			req.flash('success_msg', 'Product Added Successfuly');
			res.redirect('/products')
			
		// }
	// });
}

module.exports.product_delete = async (req, res) => {
	const id = req.params.id;
	const product = await Product.findByIdAndDelete(id);

	req.flash('success_msg', 'Product is Deleted Successfuly!');
	res.redirect('/products/');
}

module.exports.product_edit = async (req, res) => {
	const id = req.params.id;
	let [product, categories] = await Promise.all([Product.findById(id), ProductCategories.find()])
	
	res.render('products/edit', {
		product,
		categories,
		pageName: 'addProducts'
	});
	
}
module.exports.product_update = async (req, res) => {
	const error = [];
	const id = req.body.id;
	const name = req.body.name ? req.body.name.trim() : '';
	const categoryId = req.body.categoryId ? req.body.categoryId.trim() : '';
	const description = req.body.description ? req.body.description.trim() : '';

	// Validaton
	if (validator.isEmpty(name)) {
		error.push({ msg: 'Name is required' });
	}

	let updateProduct = {
		name,
		categoryId,
		description
	}

	await Product.findByIdAndUpdate(id, updateProduct);

	req.flash('success_msg', 'Product Updated');
	res.redirect('/products/');

}

//=========================Product Categories============================//

module.exports.productCategories_get = async (req, res) => {
	const categories = await ProductCategories.find();
	res.render('products/categories', {
		categories,
		pageName: 'productCategories'
	})
}

module.exports.productCategories_post = async (req, res) => {
	const errors = [];
	const name = req.body.name ? req.body.name.trim() : "";
	const description = req.body.description ? req.body.description.trim() : "";

	if (validator.isEmpty(name)) {
		errors.push({ msg: 'Name is required' });
	}

	const newCategory = new ProductCategories({
		name,
		description
	});

	await newCategory.save();
	req.flash('success_msg', 'Product Category Successfully Added!');
	res.redirect('/products/categories');

}

module.exports.productCategory_delete = async (req, res) => {
	const id = req.params.id;
	const category = await ProductCategories.findByIdAndDelete(id);

	req.flash('success_msg', 'Category is successfully deleted');
	res.redirect('/products/categories');
}

// =========================================================== //
