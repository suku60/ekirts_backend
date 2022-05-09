const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];

    let {user} = jwt.decode(token, authConfig.secret)

    try {
        if (user.adminAccess === true) {
            next();
        } else {
            res.status(403).send({ msg: "Unauthorized. User is not admin" });
        }
    } catch (error) {
        res.status(400).json({
            msg: "There's been an error.",
            error: error
        });
    }

};