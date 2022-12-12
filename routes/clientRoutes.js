//This is where you will handle the routes for clients interactions
const express = require('express');
const controller = require('../controllers/clientController');

const router = express.Router();

router.get('/', controller.index);

//homepage page  /client/home
router.get('/home', controller.home);

router.get('/calendar', controller.calendar);

//redirects to the register page
router.get('/register', controller.register);

router.get('/:id', controller.show);

router.get('/:id/rsvp', controller.rsvp);



module.exports = router;
