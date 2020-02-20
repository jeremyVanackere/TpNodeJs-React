const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const jwtKey = process.env.JWT_KEY || 'secret';
        if(typeof req.headers.authorization === 'undefined') {
            res.status(401).json({"Error":"Aucun token"})
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, jwtKey, null);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({"Error":"Token non valide"})
    }
}