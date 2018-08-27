const Task = require('../models/task.model.js');
const Column = require('../models/column.model.js');

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

// Add task to database.
exports.add = (req, res, next) => {
    let task = new Task(req.body);
    task.save()
        .then(taskResponse => {
            Column.findOne({ title: "To do" })
                .then(columnResponse => {
                    columnResponse.taskIds.push(taskResponse._id);
                    columnResponse.save()
                        .then(columnResponse => {
                            res.send({ taskResponse, columnResponse });
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Column is not modified."
                            });                
                        });
                });
        })
        .catch(err => {
            res.status(501).send({
                message: err.message || "Entity is not created!"
            });
        });
};

// Find one task from database.
exports.findOneAndUpdate = (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.id}, {$set: {content: req.body.content} }, {new: true})
    .then(task => {
        // console.log(task);
        res.send(task);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data!"
        });
    });
};

// Remove task from database.
exports.delete = (req, res, next) => {
    Task.deleteOne({ _id: req.params.tid })
        .then(response => {
            // res.send(task);
            Column.findOne({ _id: req.params.cid })
                .then(column => {
                    const index = column.taskIds.indexOf(req.params.tid);
                    if(index > -1) {
                        column.taskIds.splice(index,1);
                        column.save()
                            .then(columnResponse => {
                                Task.find()
                                    .then(taskResponse => {
                                        res.send({ taskResponse, columnResponse })
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: err.message || "Some error occurred while retrieving data!"
                                        });        
                                    })
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while retrieving data!"
                                });         
                            });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving data!"
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data!"
            });
        });
};