var express = require('express');
var router = express.Router();
const locationController = require('../../controllers/location.controller');
const adminReplier = require('../../middlewares/admin-replier');
const allowAccess = require('../../middlewares/auth.guard');
const sidebar = require('../../middlewares/dynamic-sidebar');

//GET //PRIVATE //ADD LOCATION 
router.get('/add', allowAccess('410'), sidebar.dynamicSidebar, locationController.addLocation_get, adminReplier );

//POST //PRIVATE //
router.post('/add', allowAccess('410'), sidebar.dynamicSidebar, locationController.addLocation_post, adminReplier);

//GET //PRIVATE // EDIT LOCATION
router.get('/edit/:id', allowAccess('411'), sidebar.dynamicSidebar, locationController.editLocation_get, adminReplier);

//GET //PRIVATE // EDIT LOCATION
router.post('/update', allowAccess('412'), sidebar.dynamicSidebar, locationController.updateLocation_post, adminReplier);

//GET //PRIVATE // DELETE LOCATION
router.get('/delete/:id', allowAccess('413'), sidebar.dynamicSidebar, locationController.deleteLocation_get, adminReplier);

//GET //PRIVATE // ALL LOCATIONS
router.get('/', allowAccess('420'), sidebar.dynamicSidebar, locationController.allLocations_get, adminReplier);

//GET // PRIVATE // LOCATION TRANSFER
router.get('/transfer', allowAccess('430'), sidebar.dynamicSidebar, locationController.locationTransfer_get, adminReplier);

//POST // PRIVATE // LOCATION TRANSFER
router.get('/transfer', allowAccess('430'), sidebar.dynamicSidebar, locationController.locationTransfer_post, adminReplier);

module.exports = router;