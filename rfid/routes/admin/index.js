const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const adminController = require('../../controllers/admin.controller');
const userController = require('../../controllers/user.controller');
const productRoutes = require('./products');
const inventoryRoutes = require('./inventory');
const customersRoutes = require('./customers');
const inventoryController = require('../../controllers/inventory.controller');
const allowOnly = require('../../helpers/auth.guard');

/* GET users listing. */
router.get('/', allowOnly(['admin', 'subadmin']), adminController.admin_get);

/* GET - Public - Show admin log in page */
router.get('/login', adminController.login_get);

/* POST - Public - admin log */
router.post('/login', adminController.login_post);

/* GET - Public - admin log out */
router.get('/logout', allowOnly(['admin']), adminController.logout_get);

// GET - Private - Show Users
router.get('/users', allowOnly(['admin']), userController.users_get);

// POST - Private - Add User
router.post('/users', allowOnly(['admin']), userController.register_post);

// GET - Private - Edit User
router.get('/users/edit/:id', allowOnly(['admin']), userController.edituser_get);

// PUT - Private - Update User
router.put('/users/', allowOnly(['admin']), userController.users_put);

// GET - Private - Delete User
router.get('/users/delete/:id', allowOnly(['admin']), userController.deleteuser_get);

//GET -Private -Stock
router.get('/stock',allowOnly(['admin']),inventoryController.stock_get )

//GET -Private -Stock
router.get('/stockdetail/:id',allowOnly(['admin']),inventoryController.stockDetails_get )

router.use('/products', productRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/customers', customersRoutes);

module.exports = router;