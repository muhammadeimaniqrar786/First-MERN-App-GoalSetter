const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'The Email is required.'],
    },
    password: {
        type: String,
        required: [true, 'The Password is required.'],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);