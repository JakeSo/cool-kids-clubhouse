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

//completes client sign up
router.post('/', controller.signUp);

//client login function
router.post('/login', controller.login);

//show event page for client
router.get('/:id', controller.show);

//get client to rsvp page
router.get('/:id/rsvp', controller.rsvp);



module.exports = router;
