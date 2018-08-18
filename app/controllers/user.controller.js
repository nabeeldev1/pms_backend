const User = require('../models/user.model.js');

// Find a single user based on credentials
exports.login = (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Invalid email/password."
            });            
        }
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: "Sign in failed! " + err
        });
    });
};