//This is where you will handle the routes for admin interactions
const express = require('express');
const controller = require('../controllers/adminController');

const router = express.Router();

//admin login   /admin/
router.get('/', controller.index);

//homepage page  /admin/home
router.get('/home', controller.home);

//new event page /admin/new
router.get('/new', controller.new);

//
router.post('/', controller.create);

//show specific event   /admin/:id
router.get('/:id', controller.show);

//redirects to edit page    /admin/:id/edit
router.get('/:id/edit', controller.edit);

//update event  at          /admin/:id
router.put('/:id', controller.update);

//delete event at id        /admin/:id
router.delete('/:id', controller.delete);


module.exports = router;