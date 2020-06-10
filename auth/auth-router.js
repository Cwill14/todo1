const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model.js');
const secret = require('./secrets.js');
const restricted = require('./auth-middleware.js');

router.post('/signup', async (req, res) => {
    // console.log("req.body = ", req.body)
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10)
    try {
        const response = await Users.addUser(user)
        console.log("response = ", response)
        const token = generateToken(user);
        res.status(200).json({
            message: `welcome, ${user.username}`,
            token: token
        })
    } catch (error) {
        res.status(500).json(err.message)
    }
})

router.post('/login', (req, res) => {
    // console.log("req.body login = ", req.body)
    let { username, password } = req.body;
    // const { user, password } = req.body;
    // console.log("username in router = ", username)
    // Users.getUser({ user })
    Users.getUser(username)
    // Users.getUser(username, password)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `welcome back, ${user.username}`,
                    token: token
                })
            } else {
                res.status(401).json({ error: "username and/or password is incorrect" })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })

})

router.get('/users', restricted, (req, res) => {
    Users.getAllUsers()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router;