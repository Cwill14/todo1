const db = require('../data/dbConfig');

module.exports = {
    addUser,
    getUser,
    getAllUsers
}

function addUser(user) {
    return db('users').insert(user)
}

function getUser(user) {
    return db('users').where(user)
}

function getAllUsers() {
    return db('users')
}