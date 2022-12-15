//This is where you will handle the routes for clients interactions
const express = require('express');
const controller = require('../controllers/clientController');
const {validateSignUp, validateLogIn, validateResult, validateId, validateEvent} = require('../middlewares/validator');
const {isGuest, isLoggedIn, isAuthor} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');

const router = express.Router();

//login page
router.get('/', isGuest, controller.index);

//homepage page  /client/home
router.get('/profile', isLoggedIn, controller.profile);

router.get('/calendar', controller.calendar);

//redirects to the register page
router.get('/register', isGuest, controller.register);

//completes client sign up
router.post('/', isGuest, validateSignUp, validateResult, controller.signUp);

//client login function
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

//show event page for client
router.get('/:id', validateId, isLoggedIn, controller.show);

//get client to rsvp page
router.get('/:id/rsvp', controller.rsvp);

//POST completes rsvp
router.post('/:id/rsvp', controller.rsvpGo);



module.exports = router;
