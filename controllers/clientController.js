//This is where the call back functions for the client side of the website will go
const Client = require('../models/clientUser');
const model = require('../models/event');
const Rsvp = require('../models/rsvp');


//renders client login page
exports.index = (req, res)=>{
    res.render('./client/index');
};

//renders client calendar
exports.calendar = (req, res, next) => {
    model.find()
        .then(events => {
            res.render('./client/calendar', { events });
        })
        .catch(err => next(err));
};

//render rsvp page
exports.rsvp = (req, res, next) => {
        let id = req.params.id;
        model.findById(id)
        .then(event=>{
            res.render('./client/rsvp', { event, id });
        })
        .catch(err=>next(err));
};

//complete rsvp 
exports.rsvpGo = (req, res, next)=>{
    Rsvp.findOneAndUpdate({client: req.session.user, event: req.params.id}, {going: req.body.going, guests: req.body.guests}, {upsert: true})
    .then(rsvp=>{
        res.redirect('/client/home');
        req.flash('success', 'RSVP successful');
    })
    .catch(err=>next(err));
};

//displays entire list of events
exports.home = (req, res)=>{
    model.find()
    .then(events=>{
        res.render('./client/home', { events });
    })
    .catch(err=>next(err));
};

//displays events for client
//needs to be refactored
exports.show = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
        .then(event => {
            console.log(event);
            return res.render('./client/show', { event });
        })
        .catch(err => next(err));
};

//renders client register page
exports.register = (req, res)=>{
    res.render('./client/register');
};

//creates client account
exports.signUp = (req, res, next)=>{
    let user = new Client(req.body);
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
    Client.findOne({ email: email })
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

//renders client profile page
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Rsvp.find({client: id}).populate('event', 'title date location')
    .then(rsvps=>{
        res.render('./client/profile', { rsvps });
    })
};