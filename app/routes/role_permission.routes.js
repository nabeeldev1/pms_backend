var express = require('express');
var router = express.Router();


const role_permission = require('../controllers/role_permission.controller.js');

router.route('/')
    .get(role_permission.findAll)

router.route('/add')
    .post(role_permission.add)

router.route('/:id')
    .get(role_permission.findOne)


module.exports = router;

