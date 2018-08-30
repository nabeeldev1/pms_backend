var express = require('express');
var router = express.Router();


const permission = require('../controllers/permission.controller.js');

router.route('/')
    .get(permission.findAll)

router.route('/add')
    .post(permission.add)

router.route('/:id')
    .get(permission.findOne)


module.exports = router;

