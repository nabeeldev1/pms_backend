const mongoose = require('mongoose');

const ColumnSchema = mongoose.Schema({
    title:{
        type: String
    },
    taskIds: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Column', ColumnSchema);