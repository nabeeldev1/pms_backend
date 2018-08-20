var express = require('express');
var router = express.Router();


const column = require('../controllers/column.controller.js');

router.route('/')
    // get all activities
    .get(column.findAll)


module.exports = router;

