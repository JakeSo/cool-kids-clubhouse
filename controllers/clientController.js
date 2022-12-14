//This is where the call back functions for the client side of the website will go
const clientUser = require('../models/clientUser');
const model = require('../models/event');


//renders client login page
exports.index = (req, res)=>{
    res.render('./client/index');
};

//renders client calendar
exports.calendar = (req, res) => {
    res.render('./client/calendar');
};

exports.rsvp = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./client/rsvp', {event});
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.')
    }
};

//displays entire list of events
exports.home = (req, res)=>{
    model.find()
    .then(events=>{
        res.render('./admin/home', { events });
    })
    .catch(err=>next(err));
};

//displays events for client
//needs to be refactored
exports.show = (req, res)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./client/show', {event});
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.');
    }
};

//renders client register page
exports.register = (req, res)=>{
    res.render('./client/register');
};

//creates client account
exports.signUp = (req, res, nexxt)=>{
    let user = new clientUser(req.body);
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
    user.save()
        .then(user => {
            req.flash('success', 'Registration succeeded!');
            res.redirect('/client/');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('back');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('back');
            }
            next(err);
        });

};

//complete client login
exports.login = (req, res, next) => {
    let email = req.body.email;
    if (email) {
        email = email.toLowerCase();
    }
    let password = req.body.password;
    clientUser.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'wrong email address');
                res.redirect('/client/');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/client/home');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/client/');
                        }
                    });
            }
        })
        .catch(err => next(err));
};