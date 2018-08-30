const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    title: {
        type: String
    },
    code: {
        type: String
    },
    module: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Permission', PermissionSchema);