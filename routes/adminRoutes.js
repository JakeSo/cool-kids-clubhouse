//This is where you will handle the routes for admin interactions
const express = require('express');
const controller = require('../controllers/adminController');

const router = express.Router();

//index page    /admin
router.get('/', controller.index);

//new event page /admin/new
router.get('/new', controller.new);

//
router.post('/', controller.create);

//show specific event   /admin/:id
router.get('/:id', controller.show);

module.exports = router;