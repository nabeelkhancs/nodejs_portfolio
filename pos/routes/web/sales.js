const express = require('express');
const router = express.Router();
const adminReplier = require('../../middlewares/admin-replier');
const saleController = require('../../controllers/sales.controller');
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

//AUTOCOMPLETE get 
router.get('/autocomplete', saleController.autoComplete,adminReplier);

//GET ALL Sales
router.get('/', allowAccess('320'), sidebar.dynamicSidebar, saleController.sales_get, adminReplier);

// POST - ADD Sale
router.post('/add', allowAccess('310'), sidebar.dynamicSidebar, saleController.salesAdd, adminReplier);

//GET print Slip
router.get('/printslip/:id', allowAccess('311'), sidebar.dynamicSidebar, saleController.printSlip_get, adminReplier);

//GET delete sale
router.get('/delete/:id', allowAccess('321'), sidebar.dynamicSidebar, saleController.deleteSale_get, adminReplier);

module.exports = router;