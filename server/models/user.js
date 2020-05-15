const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: false,
        unique: true
    },
    password: {
        type: String,
        default: false
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);