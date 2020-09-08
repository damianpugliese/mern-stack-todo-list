const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Task', TaskSchema);