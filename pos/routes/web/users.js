var express = require('express');
var router = express.Router();
const allowAccess = require('../../middlewares/auth.guard');
const userController = require('../../controllers/user.controller');
const sidebar = require('../../middlewares/dynamic-sidebar');

// GET - Private - Show Users
router.get('/', allowAccess('510'), sidebar.dynamicSidebar, userController.users_get);

// POST - Private - Add User
router.post('/', allowAccess('510'), sidebar.dynamicSidebar, userController.register_post);

// GET - Private - Edit User
router.get('/edit/:id', allowAccess('511'), sidebar.dynamicSidebar, userController.edituser_get);

// PUT - Private - Update User
router.put('/', allowAccess('510'), sidebar.dynamicSidebar, userController.users_put);

// GET - Private - Delete User
router.get('/delete/:id', allowAccess('512'), sidebar.dynamicSidebar, userController.deleteuser_get);

router.get('/sidebar',  sidebar.dynamicSidebar);
module.exports = router;
