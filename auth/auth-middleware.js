const jwt = require('jsonwebtoken');
const secret = require('./secrets');

module.exports = (req, res, next) => {
    // console.log("req.headers = ", req.headers)
    const token = req.headers.authorization;
    token
        ? jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            err
                ? res.status(401).json({ error: "unauthorized", err: err.message })
                : req.user = { username: decodedToken.username }
                    next();
        })
        : res.status(400).json({ error: "no token provided "})
}