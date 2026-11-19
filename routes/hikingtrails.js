const express = require('express');
const router = express.Router();
const hikingtrail_controller = require('../controllers/hikingtrail');

// Home: list all trails (page view)
router.get('/', hikingtrail_controller.hikingtrail_view_all_Page);

// Create page (must come before the /:id routes)
router.get('/create', hikingtrail_controller.hikingtrail_create_Page);

// Detail page (mode defaults to 'inspect')
router.get('/:id', hikingtrail_controller.hikingtrail_item_Page);

// Update / delete / inspect pages
router.get('/:id/:mode', hikingtrail_controller.hikingtrail_item_Page);

module.exports = router;