const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    content: {
        type: String
    },
    createdBy: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);