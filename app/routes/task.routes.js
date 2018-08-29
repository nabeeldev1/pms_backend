var express = require('express');
var router = express.Router();


const task = require('../controllers/task.controller.js');
const user = require('../controllers/user.controller.js');

router.route('/')
    .get(user.loginRequired ,task.findAll)

router.route('/add')
    .post(user.loginRequired, task.add)

router.route('/:id')
    .put(user.loginRequired, task.findOneAndUpdate)

router.route('/:tid/:cid')
    .delete(user.loginRequired, task.delete)

router.route('/drag')
    .post(user.loginRequired, task.drag)


module.exports = router;

