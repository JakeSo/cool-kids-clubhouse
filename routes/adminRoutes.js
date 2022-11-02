//This is where you will handle the routes for admin interactions
const express = require('express');
const controller = require('../controllers/adminController');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', controller.new);

module.exports = router;