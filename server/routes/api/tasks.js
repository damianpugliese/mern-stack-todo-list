// Dependencies
const express = require('express');
const router = express.Router();

// Controllers 
const { getTask, getTaskById, addTask, updateTask, completeTask, deleteTask } = require('../../controllers/tasks');

// Auth Middleware
const auth = require('../../middlewares/auth');

// Routes
router.get('/', auth, getTask);
router.get('/:id', auth, getTaskById);
router.post('/add', auth, addTask);
router.put('/update/:id', auth, updateTask);
router.put('/complete/:id', auth, completeTask);
router.delete('/delete/:id', auth, deleteTask);

module.exports = router;