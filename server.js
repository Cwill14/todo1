const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

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
