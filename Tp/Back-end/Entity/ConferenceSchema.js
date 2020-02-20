var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/conference', { useNewUrlParser: true, useUnifiedTopology: true });

var conference = new Schema({
});

const Conference = mongoose.model('conference', conference, 'conference');