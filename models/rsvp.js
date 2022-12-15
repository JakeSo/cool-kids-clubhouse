const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
    going: {type: String, required: [true]},
    guests: {type: Number, required: [true]}
});

module.exports = mongoose.model('Rsvp', rsvpSchema);