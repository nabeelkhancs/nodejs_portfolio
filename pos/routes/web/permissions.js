var express = require('express');
var router = express.Router();
const adminReplier = require('../../middlewares/admin-replier');
const permissionController = require('../../controllers/permission.controller');
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

router.get('/', allowAccess('520'), sidebar.dynamicSidebar, permissionController.permissions_get,adminReplier);

router.get('/add', allowAccess('530'), sidebar.dynamicSidebar, permissionController.addPermissions_get,adminReplier);

router.post('/add', allowAccess('530'), sidebar.dynamicSidebar, permissionController.addPermissions_post,adminReplier);

router.get('/edit/:id', allowAccess('531'), sidebar.dynamicSidebar, permissionController.editPermissions_get,adminReplier);

router.post('/update', allowAccess('532'), sidebar.dynamicSidebar, permissionController.updatePermissions_post,adminReplier);

router.get('/delete/:id', allowAccess('533'), sidebar.dynamicSidebar, permissionController.deletePermissions_get,adminReplier);

module.exports = router;