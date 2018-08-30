const Role = require('../models/role.model.js');
const User = require('../models/user.model.js');

// Retrieve and return roles from the database.
exports.findAll = (req, res, next) => {
    Role.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Roles not found!"
            });
        });
};

// Assign specific role to specific user
exports.assignRole = (req, res, next) => {
    Role.findOne({ name : req.body.roleName })
        .then(roleResponse => {
            User.findOne({ email: req.body.email })
                .then(userResponse => {
                    userResponse.role_id = roleResponse._id;
                    userResponse.save()
                        .then(userSave => {
                            res.send(userSave);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Role is not added to user!"
                            });
                        });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "User not found!"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Role not found!"
            });
        });
};

// Add role to database.
exports.add = (req, res, next) => {
    let role = new Role(req.body);
    role.save()
        .then(roleResponse => {
            res.send(roleResponse);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Role cannot be added!"
            });
        });
        
};

// Retrieve and return a role from the database.
exports.findOne = (req, res, next) => {
    Role.findById({ _id: req.params.id })
        .then(role => {
            res.send(role);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Role not found!"
            });
        });
};