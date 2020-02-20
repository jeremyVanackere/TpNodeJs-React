const express = require('express');
const app = express();
const router = require('./Router');
const jwt = require('jsonwebtoken');
const con = require('./VerifConnexion');
const Conference = require('./Entity/ConferenceSchema');
const User = require('./Entity/userSchema');

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/', router);

app.get('/socket.io', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/', con, (req, res) => {
    res.send('HELLO WORLD !');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Listening on port ${port}...');
})