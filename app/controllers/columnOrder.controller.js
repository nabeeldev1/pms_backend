const ColumnOrder = require('../models/columnOrder.model.js');

// Retrieve and return all colum orders from the database.
exports.findAll = (req, res) => {
    ColumnOrder.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};