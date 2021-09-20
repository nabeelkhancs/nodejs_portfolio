const express = require('express');
const router = express.Router();
const productRoutes = require('./products');
const purchaseRoutes = require('./purchases');
const supplierRoutes = require('./suppliers');
const customerRoutes = require('./customers');
const saleRoutes = require('./sales');
const userRoutes = require('./users');
const locationRoutes = require('./locations');
const permissionRoutes = require('./permissions');
const saleController = require('../../controllers/sales.controller');
const adminController = require('../../controllers/admin.controller');
const adminReplier = require('../../middlewares/admin-replier');
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');
const dashboardController = require('../../controllers/dashboard.controller');

/* GET home page. */
router.get('/', allowAccess('000'), sidebar.dynamicSidebar, dashboardController.dashboard_get);
router.get('/dashboard/:id', allowAccess('000'), sidebar.dynamicSidebar, dashboardController.locationDashboard_get);

//Supplier GET
// router.post('/test', (req, res) => {
//   console.log(JSON.stringify(req.body));
//   console.log(req.body.members['0']['date'])
// });

router.get('/login', adminController.login_get);
router.post('/login', adminController.login_post);
router.get('/forbidden', adminController.forbidden);
router.get('/logout', adminController.logout_get);

router.get('/pos', allowAccess('310'), sidebar.dynamicSidebar, saleController.pos_get, adminReplier);

router.use('/users', userRoutes);
router.use('/permissions', permissionRoutes);
router.use('/products', productRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/customers', customerRoutes);
router.use('/sales', saleRoutes);
router.use('/locations', locationRoutes);

module.exports = router;
