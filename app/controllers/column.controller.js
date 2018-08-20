const Column = require('../models/column.model.js');

// Retrieve and return all colums from the database.
exports.findAll = (req, res) => {
    Column.find()
    .then(columns => {
        res.send(columns);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};