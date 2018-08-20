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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var task = require('./app/routes/task.routes');
var columnOrder = require('./app/routes/columnOrder.routes');
var column = require('./app/routes/column.routes');
routing();

app.get('/', (req, res) => {
    res.json({"message": "Welcome to PMS"});
});

// require('./app/routes/note.routes.js', './app/routes/user.routes.js')(app);
// require('./app/routes/user.routes.js');
// require('./app/routes/columnOrder.routes.js');
// require('./app/routes/task.routes.js');
// require('./app/routes')(app);

// ...

function routing() {
    app.use('/tasks', task);
    app.use('/column-orders', columnOrder);
    app.use('/columns', column);
}

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});