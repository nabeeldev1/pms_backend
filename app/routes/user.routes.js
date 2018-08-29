var express = require('express');
var router = express.Router();


const user = require('../controllers/user.controller.js');

router.route('/')
    .post(user.login)

router.route('/register')
    .post(user.register)

module.exports = router;

