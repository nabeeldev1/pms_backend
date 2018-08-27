const express = require('express');
const bodyParser = require('body-parser');
const seeds = require('./seeds');

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// seeds.columns();
// seeds.tasks();
// seeds.columnOrder();

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('Origin'));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

var task = require('./app/routes/task.routes');
var columnOrder = require('./app/routes/columnOrder.routes');
var column = require('./app/routes/column.routes');
var user = require('./app/routes/user.routes');
routing();

app.get('/', (req, res) => {
    res.json({"message": "Welcome to PMS"});
});

function routing() {
    app.use('/tasks', task);
    app.use('/column-orders', columnOrder);
    app.use('/columns', column);
    app.use('/users', user);
}

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});