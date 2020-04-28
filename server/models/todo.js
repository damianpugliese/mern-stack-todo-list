const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
    titulo: { type: String, required: true }
});

module.exports = mongoose.model('Todo', TodoSchema);