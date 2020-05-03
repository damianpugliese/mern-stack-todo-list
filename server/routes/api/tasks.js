const express = require('express');
const router = express.Router();

const Task = require('../../models/task');

router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1 })
        .then(tasks => res.json(tasks));
});

router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => console.log(err))
});

router.post('/add', (req, res) => {
    const newTask = new Task({
        title: req.body.title
    });
    newTask.save()
        .then(task => res.json(task))
        .catch(err => console.log(err))
});

router.put('/update/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ success: false }));
});

router.put('/complete/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { isCompleted: req.body.isCompleted })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
});

router.delete('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then(() => res.json({ succes: true }))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;