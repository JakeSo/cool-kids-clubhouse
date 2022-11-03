//This is where you will handle the routes for clients interactions
const express = require('express');
const controller = require('../controllers/clientController');

const router = express.Router();

router.get('/', controller.index);

router.get('/calendar', controller.calendar);

module.exports = router;