const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const allowOnly = require('../../helpers/auth.guard');

//GET - PUBLIC SHOW PRODUCT
router.get('/', allowOnly(['admin']), productController.products_get);

//GET - PUBLIC ADD PRODUCT
router.get('/add', allowOnly(['admin']), productController.addProduct_get);

// POST - PUBLIC ADD PRODUCT
router.post('/add', allowOnly(['admin']), productController.products_post);

//GET - PUBLIC PRODUCT CATEGORIES
router.get('/categories', allowOnly(['admin']), productController.productCategories_get);

//POST - PUBLIC ADD PRODUCT CATEGORY
router.post('/categories', allowOnly(['admin']), productController.productCategories_post);

//DELETE - PUBLIC DELETE PRODUCT CATEGORY
router.get('/categories/delete/:id', allowOnly(['admin']), productController.productCategory_delete);

//DELETE - PUBLIC DELETE PRODUCT 
router.get('/delete/:id', allowOnly(['admin']), productController.product_delete);

//EDIT - PUBLIC EDIT PRODUCT
router.get('/edit/:id', allowOnly(['admin']), productController.product_edit);

//UPDATE - PUBLIC UPDATE PRODUCT
router.post('/update', allowOnly(['admin']), productController.product_update);

module.exports = router;