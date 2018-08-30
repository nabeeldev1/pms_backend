const Role_Permission = require('../models/role_permission.model.js');

// Retrieve and return permissions from the database.
exports.findAll = (req, res, next) => {
    Role_Permission.find()
        .then(rolePermissions => {
            res.send(rolePermissions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Roles and permissions not found!"
            });
        });
};

// Add new permission to database.
exports.add = (req, res, next) => {
    let rolePermission = new Role_Permission(req.body);
    rolePermission.save()
        .then(rolePermissionRes => {
            res.send(rolePermissionRes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Role cannot be added!"
            });
        });
        
};

// Retrieve and return a permission from the database.
exports.findOne = (req, res, next) => {
    Role_Permission.findById({ _id: req.params.id })
        .then(rolePermission => {
            res.send(rolePermission);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Role-Permission mapping not found!"
            });
        });
};