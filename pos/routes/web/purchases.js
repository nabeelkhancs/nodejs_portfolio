const express = require('express');
const router = express.Router();
const purchaseController = require('../../controllers/purchase.controller');
const adminReplier = require('../../middlewares/admin-replier')
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

//GET ALL- PURCHASES LIST
router.get('/', allowAccess('220'), sidebar.dynamicSidebar, purchaseController.purchases_get,adminReplier);

//GET ADD new Purchase
router.get('/add', allowAccess('210'), sidebar.dynamicSidebar, purchaseController.addPurchases_get,adminReplier);

//POST ADD new Purchase
router.post('/add', allowAccess('210'), sidebar.dynamicSidebar, purchaseController.addPurchases_post,adminReplier);

//GET delete Purchase
router.get('/delete/:id', allowAccess('211'), sidebar.dynamicSidebar, purchaseController.deletePurchase_get, adminReplier);

//GET Print Purchase
router.get('/print/:id', allowAccess('212'), sidebar.dynamicSidebar, purchaseController.printPurchase_get, adminReplier)

module.exports = router;