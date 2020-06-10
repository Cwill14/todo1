const router = require('express').Router();

const Tasks = require('./mainModel');
const restricted = require('../auth/auth-middleware');

router.get('/:uId', restricted, (req, res) => {
    const userId = req.params.uId;
    Tasks.getTasks(userId)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.post('/:uId', restricted, (req, res) => {
    const newTask = {
        task: req.body.task,
        completed: false,
        user_id: req.params.id
    }
    // const userId = req.params.id;
    if (newTask) {
        Tasks.addTask(newTask)
            .then(response => {
                res.status(201).json({ message: 'successfully added task', newID: response })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(400).json({ error: 'task missing in request' })
    }
})

router.put('/:uId/:tId', async (req, res) => {
    const userId = req.params.uId
    const taskID = req.params.tId;
    const changes = req.body;
    if (changes) {
        try {
            const response = await Tasks.updateTask(userId, taskID, changes);
            res.status(200).json({ message: "successfully updated task" })
        } catch(err) {
            res.status(500).json(err.message)
        }
    } else {
        res.status(400).json({ error: "missing changes in request" })
    }
})

router.delete('/:uId/:tId', restricted, (req, res) => {
    const taskID = req.params.tId;
    const userId = req.params.uId;
    Tasks.deleteTask(userId, taskID)
        .then(response => {
            res.status(200).json({ response: response, message: "successfully deleted task" })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message, message: "problem deleting task" })
        })
})

module.exports = router;