const Task = require('../models/task.model.js');

// Retrieve and return tasks from the database.
exports.findAll = (req, res, next) => {
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};