const Task = require('../models/task');

const getTask = async (req, res) => {

    const { id } = req.user;

    try {

        const tasks = await Task.find({ createdBy: id })
            .sort({ date: -1 });

        res.json(tasks);

    } catch (err) {
        return res.status(400).json({ msg: 'Oops! Something went wrong. Try again!' });
    }

}

const getTaskById = async (req, res) => {

    const { id } = req.params;

    try {

        const task = await Task.findById(id);

        res.json(task);

    } catch (err) {
        return res.status(400).json({ msg: 'Oops! Something went wrong. Try again!' });
    }

}

const addTask = async (req, res) => {

    const { id } = req.user;

    const newTask = new Task({
        title: req.body.title,
        createdBy: id
    });

    try {

        const task = await newTask.save();

        res.status(200).send(task);

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Somethig went wrong. Please try again' });
    }

}

const updateTask = async (req, res) => {

    const { id } = req.params;
    const { newTitle } = req.body;

    console.log(id, newTitle)

    try {
        
        const task = await Task.findByIdAndUpdate(id, { title: newTitle }, { new: true });

        res.status(200).send(task);

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Somethig went wrong. Please try again' })
    }
    
}

const completeTask = async (req, res) => {

    const { id } = req.params;
    const { isCompleted } = req.body;

    try {
        
        const task = await Task.findByIdAndUpdate(id, { isCompleted: isCompleted })

        res.status(200).send(task);

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Somethig went wrong. Please try again' });
    }
    
}

const deleteTask = async (req, res) => {

    const { id } = req.params;

    try {
        
        const task = await Task.findByIdAndRemove(id);

        res.status(200).send(task);

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Somethig went wrong. Please try again' });
    }

}

module.exports = {
    getTask,
    getTaskById,
    addTask,
    updateTask,
    completeTask,
    deleteTask
}