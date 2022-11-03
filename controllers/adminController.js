//This is where the call back functions for the admin side of the website will go
const model = require('../models/event');


exports.index = (req, res)=>{
    res.render('./admin/index');
};

exports.home = (req, res)=>{
    let events = model.find();
    res.render('./admin/home', {events});
};

exports.new = (req, res)=>{
    res.render('./admin/new');
};

exports.create = (req, res)=>{
    let event = req.body;
    model.save(event);
    res.redirect('/admin/home');
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

exports.edit = (req, res)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./admin/edit', {event});
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.')
    }
};

exports.update = (req, res)=>{
    let event = req.body;
    let id = req.params.id;

    if(model.updateById(id, event)){
        res.redirect('/admin/home');
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.')
    }
};

exports.delete = (req, res)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/admin/home');
    } else{
        res.status(404).send('Event with id ' + id + ' does not exist.')
    }
};

