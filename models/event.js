const { v4: uuidv4 } = require('uuid');


const events = [
    {
        id: '1',
        title: '',
        details: '',
        date: '',
        location: '',
        host: ''
    },
    {
        id: '2',
        title: '',
        details: '',
        date: '',
        location: '',
        host: ''
    },
    {
        id: '3',
        title: '',
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

exports.save = function(event){
    event.id = uuidv4();
    events.push(event);
}