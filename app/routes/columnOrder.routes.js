var express = require('express');
var router = express.Router();


const columnOrder = require('../controllers/columnOrder.controller.js');
const user = require('../controllers/user.controller.js');

router.route('/')
    // get all activities
    .get(user.loginRequired, columnOrder.findAll)


module.exports = router;

