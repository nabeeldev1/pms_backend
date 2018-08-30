var express = require('express');
var router = express.Router();


const task = require('../controllers/task.controller.js');
const user = require('../controllers/user.controller.js');

router.route('/')
    .get(user.loginRequired, user.hasPermission('view-task'), task.findAll)

router.route('/add')
    .post(user.loginRequired, user.hasPermission('add-task'), task.add)

router.route('/:id')
    .put(user.loginRequired, user.hasPermission('update-task'), task.findOneAndUpdate)

router.route('/:tid/:cid')
    .delete(user.loginRequired, user.hasPermission('delete-task'), task.delete)

router.route('/drag')
    .post(user.loginRequired, user.hasPermission('drag-task'), task.drag)


module.exports = router;