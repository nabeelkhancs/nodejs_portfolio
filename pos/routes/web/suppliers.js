const express = require('express');
const router = express.Router();
const supplierController = require('../../controllers/supplier.controller');
const adminReplier = require('../../middlewares/admin-replier')
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

//GET ALL supplier 
router.get('/', allowAccess('230'), sidebar.dynamicSidebar, supplierController.suppliers_get,adminReplier );

//POST suppliers
router.post('/', allowAccess('230'), sidebar.dynamicSidebar, supplierController.supplier_post,adminReplier);
module.exports = router;

//DELETE suppliers
router.get('/delete/:id', allowAccess('231'), sidebar.dynamicSidebar, supplierController.supplier_delete,adminReplier);
module.exports = router;


