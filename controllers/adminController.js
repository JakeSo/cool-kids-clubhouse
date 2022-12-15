//This is where the call back functions for the admin side of the website will go
const Event = require('../models/event');
const adminUser = require('../models/adminUser');
const Rsvp = require('../models/rsvp');

exports.index = (req, res) => {
    res.render('./admin/index');
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    if (email) {
        email = email.toLowerCase();
    }
    let password = req.body.password;
    adminUser.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'wrong email address');
                res.redirect('/admin/');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/admin/profile');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/admin/');
                        }
                    });
            }
        })
        .catch(err => next(err));
};

exports.register = (req, res) => {
    res.render('./admin/register');
};

exports.signUp = (req, res, next) => {
    let user = new adminUser(req.body);
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
    user.save()
        .then(user => {
            req.flash('success', 'Registration succeeded!');
            res.redirect('/admin/');
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

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([adminUser.findById(id), Event.find({ author: id })])
        .then(results => {
            const [user, events] = results;
            res.render('./admin/profile', { user, events });
        })
        .catch(err => next(err));
    //res.render('./admin/home');
};

exports.new = (req, res) => {
    res.render('./admin/new');
};

exports.create = (req, res) => {
    let event = new Event(req.body);
    event.author = req.session.user;
    event.save()
        .then(event => {
            req.flash('success', 'Connection has been created successfully');
            res.redirect('/admin/profile');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/admin/new');
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    
    Promise.all([Event.findById(id), Rsvp.find({event: id}).populate('client', 'firstName lastName')])
        .then(results => {
            const [event, rsvps] = results;
            res.render('./admin/show', { event, rsvps });
        })
        .catch(err => next(err));

        /*Event.findById(id)
        .then(event => {
            return res.render('./admin/show', { event });
        })
        .catch(err => next(err)); */

    // let id = req.params.id;
    // let event = model.findById(id);
    // if (event) {
    //     res.render('./admin/show', { event });
    // } else {
    //     res.status(404).send('Event with id ' + id + ' does not exist.');
    // }
};

exports.edit = (req, res) => {
    let id = req.params.id;
    Event.findById(id)
        .then(event => {
            res.render('./admin/edit', { event });
        })
        .catch(err => next(err));

    // let id = req.params.id;
    // let event = model.findById(id);
    // if (event) {
    //     res.render('./admin/edit', { event });
    // } else {
    //     res.status(404).send('Event with id ' + id + ' does not exist.')
    // }
};

exports.update = (req, res) => {
    let event = req.body;
    let id = req.params.id;

    Event.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
        .then(event => {
            res.redirect('/admin/' + id);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                // req.flash('error', err.message);
                return res.redirect('/back');
            }
            next(err);
        });

    // let event = req.body;
    // let id = req.params.id;

    // if (model.updateById(id, event)) {
    //     res.redirect('/admin/home');
    // } else {
    //     res.status(404).send('Event with id ' + id + ' does not exist.')
    // }
};

exports.delete = (req, res) => {
    let id = req.params.id;

    Event.findByIdAndDelete(id, { useFindAndModify: false })
        .then(event => {
            res.redirect('/admin/profile');
        })
        .catch(err => next(err));

    // let id = req.params.id;
    // if (model.deleteById(id)) {
    //     res.redirect('/admin/home');
    // } else {
    //     res.status(404).send('Event with id ' + id + ' does not exist.')
    // }
};