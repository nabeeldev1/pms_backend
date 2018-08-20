const mongoose = require('mongoose');

const ColumnOrderSchema = mongoose.Schema({
    columnOrder: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Column'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('ColumnOrder', ColumnOrderSchema);