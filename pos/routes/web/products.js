const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const adminReplier = require('../../middlewares/admin-replier');
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

//GET - PUBLIC SHOW PRODUCT
router.get('/', allowAccess('120'), sidebar.dynamicSidebar, productController.products_get,adminReplier);

//GET - PUBLIC SHOW PRODUCT
router.get('/print/:id', allowAccess('120'), sidebar.dynamicSidebar, productController.productPrint_get,adminReplier);

//GET - PUBLIC ADD PRODUCT
router.get('/add', allowAccess('110'), sidebar.dynamicSidebar, productController.addProduct_get,adminReplier);

//POST - PUBLIC ADD PRODUCT
router.post('/add', allowAccess('110'), sidebar.dynamicSidebar, productController.products_post,adminReplier);

//GET - PUBLIC PRODUCT CATEGORIES
router.get('/categories', allowAccess('130'), sidebar.dynamicSidebar, productController.productCategories_get,adminReplier);

//POST - PUBLIC ADD PRODUCT CATEGORY
router.post('/categories', allowAccess('130'), sidebar.dynamicSidebar, productController.productCategories_post,adminReplier);

//DELETE - PUBLIC DELETE PRODUCT CATEGORY
router.get('/categories/delete/:id', allowAccess('131'), sidebar.dynamicSidebar, productController.productCategory_delete,adminReplier);

//EDIT - PUBLIC EDIT PRODUCT
router.get('/edit/:id', allowAccess('111'), sidebar.dynamicSidebar, productController.product_edit,adminReplier);

//DELETE - PUBLIC DELETE PRODUCT 
router.get('/delete/:id', allowAccess('112'), sidebar.dynamicSidebar, productController.product_delete,adminReplier);

//UPDATE - PUBLIC UPDATE PRODUCT
router.post('/update', allowAccess('113'), sidebar.dynamicSidebar, productController.product_update,adminReplier);

//PRINT LABELS / BARCODE
router.get('/printlabel', allowAccess('140'), sidebar.dynamicSidebar, productController.printLabel_get, adminReplier);

//GENERATE BARCODE POST
router.post('/generateBarcodes', allowAccess('140'), sidebar.dynamicSidebar, productController.generateBarcode_post, adminReplier);

//PRICING - GET
router.get('/pricing', allowAccess('150'), sidebar.dynamicSidebar, productController.pricing_get, adminReplier);

//PRICING - POST
router.post('/pricing', allowAccess('150'), sidebar.dynamicSidebar, productController.pricing_post, adminReplier);

//PRICING - DELETE
router.get('/pricing/delete/:id', allowAccess('151'), sidebar.dynamicSidebar, productController.pricing_delete, adminReplier);

module.exports = router;