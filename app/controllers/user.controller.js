const User = require('../models/user.model.js');
const Role_Permission = require('../models/role_permission.model.js');
const Permission = require('../models/permission.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
exports.register = (req, res) => {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

// Find a single user based on credentials
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                user.hash_password = undefined;
                return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs'), user: user});
            }
        }
    });
};

// Confirms user is logged in or not
exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

// Confirms user roles and permissions
exports.hasPermission = (permissions) => {
    return function(req, res, next) {
        const userId = req.user._id;
        User.findOne({ _id: userId }, function(err, user) {
            if(user) {
                Permission.findOne({ code: permissions }, function(err, permission){
                    if(!permission) {
                        console.log('---1-Permission-Denied-----');
                        console.log(err);
                    }
                    if(permission) {
                        Role_Permission.findOne({ role_id: user.role_id, permission_id: permission._id }, function(err, role_perm){
                            if(!role_perm) {
                                console.log('---2-Permission-Denied-----');
                                res.status(403).send({
                                    message: 'Permission denied!'
                                });
                            }
                            if(role_perm) {
                                next();
                            }
                        });
                    }
                });
            }
            if(!user) {
                console.log('-------Not-User------');
                return res.status(401).json({ message: 'Permission denied!' });
            }
        });
    }
};