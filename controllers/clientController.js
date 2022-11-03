//This is where the call back functions for the client side of the website will go
const model = require('../models/event');


exports.index = (req, res)=>{
    res.render('./client/index');
};

exports.calendar = (req, res) => {
    res.render('./client/calendar');
}

exports.rsvp = (event, res) => {
    event = model.findById("1");
    res.render('./client/rsvp', {event});
}

exports.home = (req, res)=>{
    let events = model.find();
    res.render('./client/home', {events});
};