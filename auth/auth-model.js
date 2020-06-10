const db = require('../data/dbConfig');

module.exports = {
    addUser,
    getUser,
    getAllUsers
}

function addUser(user) {
    return db('users').insert(user)
}
// function getUser(user) {
function getUser(username) {
// function getUser(username, password) {
    // console.log("password = ", password)
    console.log("username = ", username)
    // console.log("user = ", user)
    return db('users as u')
        .where('u.username', '=', username)
        // .where(user)
}

function getAllUsers() {
    return db('users')
}