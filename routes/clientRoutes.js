//This is where you will handle the routes for clients interactions
const express = require('express');
const controller = require('../controllers/clientController');

const router = express.Router();

router.get('/', controller.index);

//homepage page  /client/home
router.get('/home', controller.home);

router.get('/calendar', controller.calendar);

router.get('/:id', controller.show);

module.exports = router;
