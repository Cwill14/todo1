const router = require('express').Router();

const Tasks = require('./mainModel');

router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.post('/', (req, res) => {
    const newTask = {
        task: req.body.task,
        completed: false
    }
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

router.put('/:id', async (req, res) => {
    const taskID = req.params.id;
    const changes = req.body;
    if (changes) {
        try {
            const response = await Tasks.updateTask(taskID, changes);
            res.status(200).json({ message: "successfully updated task" })
        } catch(err) {
            res.status(500).json(err.message)
        }
    } else {
        res.status(400).json({ error: "missing changes in request" })
    }
})

router.delete('/:id', (req, res) => {
    const taskID = req.params.id;
    Tasks.deleteTask(taskID)
        .then(response => {
            res.status(200).json({ response: response, message: "successfully deleted task" })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message, message: "problem deleting task" })
        })
})

module.exports = router;