const db = require('../data/dbConfig');

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask
}

function getTasks() {
    return db('tasks')
}
function addTask(task) {
    // return db('tasks').insert(task, "id")
    return db('tasks').insert(task)
}
function deleteTask(id) {
    return db('tasks as t').where('t.id', '=', id).delete()
}
function updateTask(id, changes) {
    return db('tasks as t').where('t.id', '=', id).update(changes)
}