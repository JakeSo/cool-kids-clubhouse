const { v4: uuidv4 } = require('uuid');


const events = [
    {
        id: '1',
        title: 'TEST EVENT',
        details: 'Information about the event goes here',
        date: '',
        location: 'Somewhere',
        host: 'Person Person'
    },
    {
        id: '2',
        title: 'TEST EVENT 2',
        details: '',
        date: '',
        location: '',
        host: ''
    },
    {
        id: '3',
        title: 'TEST EVENT 3',
        details: '',
        date: '',
        location: '',
        host: ''
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