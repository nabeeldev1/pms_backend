var express = require('express');
var router = express.Router();


const column = require('../controllers/column.controller.js');
const user = require('../controllers/user.controller.js');

router.route('/')
    // get all activities
    .get(user.loginRequired, column.findAll)


module.exports = router;

