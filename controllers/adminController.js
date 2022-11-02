//This is where the call back functions for the admin side of the website will go
const model = require('../models/event');

exports.index = (req, res)=>{
    res.render('./admin/index');
};

exports.new = (req, res)=>{
    res.render('./admin/new');
};

exports.create = (req, res)=>{
    let event = req.body;
    model.save(event);
    res.redirect('./admin/index');
};

exports.show = (req, res)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./admin/show', {event});
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.');
    }
};

