const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api');
const hikingtrail_controller = require('../controllers/hikingtrail');

router.get('/', api_controller.api);
router.get('/hikingtrails', hikingtrail_controller.hikingtrail_list);
router.get('/hikingtrails/:id', hikingtrail_controller.hikingtrail_detail);
router.post('/hikingtrails', hikingtrail_controller.hikingtrail_create_post);
router.put('/hikingtrails/:id', hikingtrail_controller.hikingtrail_update_put);
router.delete('/hikingtrails/:id', hikingtrail_controller.hikingtrail_delete);

module.exports = router;
