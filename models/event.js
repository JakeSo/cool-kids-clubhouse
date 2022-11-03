const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');


const events = [
    {
        id: '1',
        title: 'TEST EVENT',
        details: 'Information about the event goes here',
        date: DateTime.fromISO("2022-11-05").toLocaleString(DateTime.DATE_SHORT),
        location: 'Somewhere',
        host: 'Person Person'
    },
    {
        id: '2',
        title: 'TEST EVENT 2',
        details: 'Here is information and details about the event.',
        date: DateTime.fromISO("2022-11-17").toLocaleString(DateTime.DATE_SHORT),
        location: 'Location',
        host: 'John Smith'
    },
    {
        id: '3',
        title: 'TEST EVENT 3',
        details: 'Woah, would you look at that? Event details! Imagine that.',
        date: DateTime.fromISO("2022-11-30").toLocaleString(DateTime.DATE_SHORT),
        location: 'Location',
        host: 'Someone Here'
    }
];

//model functions
exports.find = function(){
    return events;
}

exports.findById = function(id){
    return events.find(event=>event.id === id);
}

exports.updateById = function(id, newEvent){
    let event = events.find(event=>event.id === id);
    if(event){
        event.title = newEvent.title;
        event.details = newEvent.details;
        event.date = newEvent.date;
        event.location = newEvent.location;
        event.host = newEvent.host;
        
        return true;
    } else{
        return false;
    }
}

exports.deleteById = function(id){
    let index = events.findIndex(event=>event.id === id);
    if(index != -1){
        events.splice(index, 1);
        return true;
    } else{
        return false;
    }
}

exports.save = function(event){
    event.id = uuidv4();
    events.push(event);
}
