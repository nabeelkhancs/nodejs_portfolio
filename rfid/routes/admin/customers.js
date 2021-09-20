const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.controller');
const allowOnly = require('../../helpers/auth.guard');

//GET PRIVATE ALL CUSTOMERS
router.get('/', allowOnly(['admin']), customerController.customers_get);

//POST PRIVATE ADD CUSTOMER
router.post('/add', allowOnly(['admin']), customerController.addCustomer_post);

//GET PRIVATE ADD CUSTOMER
router.get('/add', allowOnly(['admin']), customerController.addCustomer_get);

//GET PRIVATE EDI CUSTOMER
router.get('/edit/:id', allowOnly(['admin']), customerController.editCustomer_get);

//POST PRIVATE UPDATE CUSTOMER
router.post('/update', allowOnly(['admin']), customerController.updateCustomer_post);

//GET PRIVATE DELETE CUSTOMER
router.get('/delete/:id', allowOnly(['admin']), customerController.deleteCustomer_get);

module.exports = router;