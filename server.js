const express = require('express');

const mainRouter = require('./main/mainRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/main', mainRouter);


server.get('/', (req, res) => {
    res.status(200).json({ Dustin: "It's working!" });
});

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to ${url} at ${timestamp}`);
    next();
}

module.exports = server;
