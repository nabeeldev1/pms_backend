var express = require('express');
var router = express.Router();


const task = require('../controllers/task.controller.js');

router.route('/')
    .get(task.findAll)

router.route('/add')
    .post(task.add)

router.route('/:id')
    .put(task.findOneAndUpdate)

router.route('/:tid/:cid')
    .delete(task.delete)

router.route('/drag')
    .post(task.drag)


module.exports = router;

