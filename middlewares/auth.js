const Event = require('../models/event');
const Client = require('../models/clientUser');
const Admin = require('../models/adminUser');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/admin/profile');
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first');
        return res.redirect('/admin/');
    }
};

//check if user is author of the story
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event) {
            if(event.author == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a Event with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

//checks if user is client
exports.isClient = (req, res, next) =>{
    let user = req.session.user;
    Client.findById(user)
    .then(user=>{
        if(user){
            return next();
        } else{
            req.flash('error', 'You are not a client user');
        return res.redirect('back');
        }
    })
    .catch(err=>next(err));
};

//checks if user is admin
exports.isAdmin = (req, res, next) =>{
    let user = req.session.user;
    Admin.findById(user)
    .then(user=>{
        if(user){
            return next();
        } else{
            req.flash('error', 'You are not an admin user');
        return res.redirect('back');
        }
    })
    .catch(err=>next(err));
};