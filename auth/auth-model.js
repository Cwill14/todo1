const db = require('../data/dbConfig');

module.exports = {
    addUser,
    getUser,
    getAllUsers
}

function addUser(user) {
    return db('users').insert(user)
}

function getUser(username) {
    console.log("username = ", username)
    return db('users as u')
        .where('u.username', '=', username)
}

function getAllUsers() {
    return db('users')
}