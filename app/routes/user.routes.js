var express = require('express');
var router = express.Router();


const user = require('../controllers/user.controller.js');

router.route('/')
    // get all activities
    .post(user.login)


module.exports = router;

