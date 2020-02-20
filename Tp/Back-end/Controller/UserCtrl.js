const express = require('express');
const app = express();
var mongoose = require('mongoose');

class UserCtrl {
    saveUser(req, res) {
        const item = mongoose.model('user');
        item.create({
            name: req.body.name,
            idConference: req.body.idConference,
            tempsConnexion: req.body.tempsConnexion
        });
        res.status(200).send();
    }
}

module.exports = UserCtrl;
