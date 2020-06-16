const db = require('../data/dbConfig');

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask
    // getAllTasks
}

function getTasks(uId) {
    return db('tasks as t')
        .where('t.user_id', '=', uId)
}
// function addTask(uId, task) {
function addTask(task) {
    return db('tasks as t')
        // .where('t.user_id', '=', uId)
        .insert(task)
}
function deleteTask(uId, tId) {
    return db('tasks as t')
        .where('t.id', '=', tId)
        .where('t.user_id', '=', uId)
        .delete()
}
function updateTask(uId, tId, changes) {
    return db('tasks as t')
        .where('t.id', '=', tId)
        .where('t.user_id', '=', uId)
        .update(changes)
}

// function getAllTasks() {
//     return db('tasks as t')
// }