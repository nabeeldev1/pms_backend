var express = require('express');
var router = express.Router();


const role = require('../controllers/role.controller.js');

router.route('/')
    .get(role.findAll)

router.route('/add')
    .post(role.add)

router.route('/:id')
    .get(role.findOne)

router.route('/assign-role')
    .put(role.assignRole)


module.exports = router;

