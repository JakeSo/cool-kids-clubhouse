//This is where you will handle the routes for admin interactions
const express = require('express');
const controller = require('../controllers/adminController');
const {isGuest, isLoggedIn, isAuthor} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogIn, validateResult, validateId, validateEvent} = require('../middlewares/validator');

const router = express.Router();

//get for admin login   /admin/
router.get('/', isGuest, controller.index);

//post for admin login
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

router.get('/register', isGuest, controller.register);

router.post('/', isGuest, validateSignUp, validateResult, controller.signUp);

//GET /admin/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile);



//homepage page  /admin/home
router.get('/home', isLoggedIn, controller.home);

//new event page /admin/new
router.get('/new', isLoggedIn, controller.new);

//create event
router.post('/create', isLoggedIn, validateEvent, validateResult, controller.create);

//show specific event   /admin/:id
router.get('/:id', validateId, controller.show);

//redirects to edit page    /admin/:id/edit
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//update event  at          /admin/:id
router.put('/:id', validateId, isLoggedIn, isAuthor, validateEvent, validateResult, controller.update);

//delete event at id        /admin/:id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);


module.exports = router;