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
    const newTask = req.body.task;
    if (newTask) {
        Tasks.addTask(newTask)
            .then(response => {
                res.status(201).json({ message: 'successfully added task' })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(400).json({ error: 'task missing in request' })
    }
})

router.put()

router.delete()

module.exports = router;