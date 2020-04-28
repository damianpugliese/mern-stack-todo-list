const express = require('express');
const router = express.Router();

const Todo = require('../models/todo'); 

router.get('/', async (req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
});

module.exports = router;