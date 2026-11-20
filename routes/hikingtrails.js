
const express = require('express');
const router = express.Router();
const hikingtrail_controller = require('../controllers/hikingtrail');

// Home: list all trails
router.get('/', hikingtrail_controller.hikingtrail_view_all_Page);

// Create page
router.get('/create', hikingtrail_controller.hikingtrail_create_Page);

// Update page
router.get('/update',
    hikingtrail_controller.hikingtrail_update_Page);

// Delete page
router.get('/delete',
    hikingtrail_controller.hikingtrail_delete_Page);

// Detail page
router.get('/:id', hikingtrail_controller.hikingtrail_item_Page);

// Detail page with mode
router.get('/:id/:mode',
    hikingtrail_controller.hikingtrail_item_Page);

module.exports = router;
