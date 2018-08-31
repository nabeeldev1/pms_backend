const Task = require('../models/task.model.js');
const Column = require('../models/column.model.js');

// Retrieve and return tasks from the database.
exports.findAll = (req, res, next) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: "Task data not found."
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
                                message: "To do column not updated."
                            });                
                        });
                });
        })
        .catch(err => {
            res.status(501).send({
                message: "Task is not created!"
            });
        });
};

// Find one task from database.
exports.findOneAndUpdate = (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.id}, {$set: {content: req.body.content} }, {new: true})
        .then(task => {
            res.send(task);
        }).catch(err => {
            res.status(500).send({
                message: "Task update failed."
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
                                            message: err.message || "Task data not found."
                                        });        
                                    })
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Error saving column."
                                });         
                            });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Column not found."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Failed! Task cannot be deleted!"
            });
        });
};

// Drag and return task from the database.
exports.drag = (req, res, next) => {
    Column.findById({ _id: req.body.start })
        .then(startColumn => {
            const index = startColumn.taskIds.indexOf(req.body.taskId);
            if(index > -1) {
                startColumn.taskIds.splice(index,1);
                startColumn.save()
                 .then(startSave => {
                     Column.findById({ _id: req.body.finish })
                        .then(finishResponse => {
                            finishResponse.taskIds.push(req.body.taskId);
                            finishResponse.save()
                                .then(finishSave => {
                                    Column.find()
                                        .then(columns => {
                                            res.send(columns);
                                        }).catch(err => {
                                            res.status(500).send({
                                                message: err.message || "Column data not found."
                                            });
                                        });
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Task cannot be saved to this column."
                                    });
                                });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Task cannot be dropped to this column."
                            });
                        });
                 })
                 .catch(err => {
                    res.status(500).send({
                        message: err.message || "Task cannot be dragged from this column."
                    });
                 });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Column not found."
            });
        })
};