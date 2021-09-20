const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventory.controller');
const allowOnly = require('../../helpers/auth.guard');

router.get('/recieved', allowOnly(['admin']), inventoryController.recievedInventory_get);
router.post('/recieved/add', allowOnly(['admin']), inventoryController.recievedInventory_post);
router.get('/washing', allowOnly(['admin']), inventoryController.washingInventory_get);
router.post('/washing/add', allowOnly(['admin']), inventoryController.washingInventory_post);
router.get('/dying', allowOnly(['admin']), inventoryController.dyingInventory_get);
router.post('/dying/add', allowOnly(['admin']), inventoryController.dyingInventory_post);
router.get('/shipped', allowOnly(['admin']), inventoryController.shippedInventory_get);
router.post('/shipped/add', allowOnly(['admin']), inventoryController.shippedInventory_post);
router.get('/reports', allowOnly(['admin']), inventoryController.reports_get );
router.post('/reports/generate', allowOnly(['admin']), inventoryController.generateReports_get );

module.exports = router;
