const express = require('express');
const router = express.Router();
const con = require('./VerifConnexion');

const Conference = require('./Controller/ConferenceCtrl');
const Sign = require('./Controller/SignCtrl');
const User = require('./Controller/UserCtrl');

const sign = new Sign();
const conference = new Conference();
const user = new User();

router.route('/sign')
    .get(sign.getConnexion);
router.route('/conference')
    .get(con ,conference.getList)
router.route('/conference/add')
    .get(con ,conference.addConference)
router.route('/user')
    .post(con ,user.saveUser)

module.exports = router;