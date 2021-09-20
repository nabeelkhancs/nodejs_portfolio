const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.controller');
const adminReplier = require('../../middlewares/admin-replier')
const allowAccess = require('../../middlewares/auth.guard');

//GET ALL customer 
router.get('/', allowAccess('330'), customerController.customers_get,adminReplier );

//POST customers
router.post('/', allowAccess('330'), customerController.customer_post,adminReplier);
module.exports = router;

//DELETE customers
router.get('/delete/:id', allowAccess('331'),  customerController.customer_delete,adminReplier);

module.exports = router;