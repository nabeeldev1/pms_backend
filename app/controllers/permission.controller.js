const Permission = require('../models/permission.model.js');

// Retrieve and return permissions from the database.
exports.findAll = (req, res, next) => {
    Permission.find()
        .then(permissions => {
            res.send(permissions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Permissions not found!"
            });
        });
};

// Add new permission to database.
exports.add = (req, res, next) => {
    let permission = new Permission(req.body);
    permission.save()
        .then(permissionResponse => {
            res.send(permissionResponse);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Role cannot be added!"
            });
        });
        
};

// Retrieve and return a permission from the database.
exports.findOne = (req, res, next) => {
    Permission.findById({ _id: req.params.id })
        .then(permission => {
            res.send(permission);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Role not found!"
            });
        });
};