//This is where you will handle the routes for main interactions
const express = require('express');
const controller = require('../controllers/mainController');
const {isLoggedIn} = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.index);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;