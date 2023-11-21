const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    text: {
        type: 'string',
        required: [true, 'The Text field is required.']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The User is required.']
    },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);