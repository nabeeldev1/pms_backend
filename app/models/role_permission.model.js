const mongoose = require('mongoose');

const RolePermissionSchema = mongoose.Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Role_Permission', RolePermissionSchema);