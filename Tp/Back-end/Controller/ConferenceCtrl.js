const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const Protocol = require('./ProtocolCtrl');
var mongoose = require('mongoose');

class ConferenceCtrl {
    getList(req, res) {
        const conf = mongoose.model('conference');
        conf.find({}, (err, conferences) => {
            console.log(conferences)
            res.send(conferences);
        });
    }

    addConference(req, res) {
        const conf = mongoose.model('conference');
        conf.create({});
        res.status(200).send();
    }
}

module.exports = ConferenceCtrl;

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log(msg);
        let proto = new Protocol();
        proto.setInformations(msg);
        console.log(proto.getIdConference()+ " / "+ proto.getMessage())
        io.emit(proto.getIdConference(), proto.getMessage());
    });
});

http.listen(3020, function(){
    console.log('listening on *:3020');
});