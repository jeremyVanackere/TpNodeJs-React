var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/conference', { useNewUrlParser: true, useUnifiedTopology: true });

var user = new Schema({
    name: String,
    idConference: String,
    tempsConnexion: String
});

const User = mongoose.model('user', user, 'user');