var express = require('express');
var router = express.Router();


const task = require('../controllers/task.controller.js');

router.route('/')
    .get(task.findAll)

router.route('/add')
    .post(task.add)

router.route('/:id')
    .post(task.findOneAndUpdate)

router.route('/:tid/:cid')
    .get(task.delete)


module.exports = router;

