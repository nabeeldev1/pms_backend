var express = require('express');
var router = express.Router();


const columnOrder = require('../controllers/columnOrder.controller.js');

router.route('/')
    // get all activities
    .get(columnOrder.findAll)


module.exports = router;

