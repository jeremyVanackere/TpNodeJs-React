const jwt = require('jsonwebtoken');

class Sign {

    getConnexion(req, res) {
        const jwtKey = process.env.JWT_KEY || 'secret';
        const token = jwt.sign({email: "test"}, jwtKey, {expiresIn: '1h'});
        console.log(token);
        res.send({token: token});
    }
}

module.exports = Sign;