var express = require('express');
var router = express.Router();


const task = require('../controllers/task.controller.js');

router.route('/')
    // get all activities
    .get(task.findAll)


module.exports = router;

