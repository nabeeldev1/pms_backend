const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);