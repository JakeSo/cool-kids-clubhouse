const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    id: {type: String},
    title: {type: String, requried: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    details: {type: String, required: [true, 'content is required'], minLength: [10, 'the content should have a least 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    start: {type: String, required: [true, 'Start_date is required']},
    end: {type: String, required: [true, 'End_date is required']}},
);

//collection name is connections in the database
module.exports = mongoose.model('Event', eventSchema);




// const { v4: uuidv4 } = require('uuid');
// const { DateTime } = require('luxon');


// const events = [
//     {
//         id: '1',
//         title: 'Pizza Night',
//         details: 'Come enjoy pizza with plenty of other cool kids!',
//         date: '11/4/2022',
//         location: 'UNCC Woodward Hall',
//         host: 'Bob'
//     },
//     {
//         id: '2',
//         title: 'Movie Night',
//         details: 'If you love movies just as much as me come join the cool kids for a movie night!',
//         date: '11/5/2022',
//         location: 'UNCC Student Union',
//         host: 'John'
//     },
//     {
//         id: '3',
//         title: "The Coolest Ninjas",
//         details: 'Come be a ninja with us cool kids at Ninja Nation!',
//         date: '11/6/2022',
//         location: 'Ninja Nation',
//         host: 'Mary'
//     }
// ];

// //model functions
// exports.find = function(){
//     return events;
// }

// exports.findById = function(id){
//     return events.find(event=>event.id === id);
// }

// exports.updateById = function(id, newEvent){
//     let event = events.find(event=>event.id === id);
//     if(event){
//         event.title = newEvent.title;
//         event.details = newEvent.details;
//         event.date = newEvent.date;
//         event.location = newEvent.location;
//         event.host = newEvent.host;
        
//         return true;
//     } else{
//         return false;
//     }
// }

// exports.deleteById = function(id){
//     let index = events.findIndex(event=>event.id === id);
//     if(index != -1){
//         events.splice(index, 1);
//         return true;
//     } else{
//         return false;
//     }
// }

// exports.save = function(event){
//     event.id = uuidv4();
//     events.push(event);
// } 

//mongodb schema
/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true]},
    details: {type: String, required: [true], minlength: [10]},
    date: {type: String, required: [true]},
    location: {type: String, required: [true]},
    //change once users are implemented
    host: {type: String, required: [true]}
});

module.exports = mongoose.model('Event', eventSchema);
*/