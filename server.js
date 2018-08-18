const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const user = require('./app/routes/user.routes');

const seeds = require('./seeds');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// seeds.columns();
seeds.tasks();

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


app.get('/', (req, res) => {
    res.json({"message": "Welcome to PMS"});
});

// require('./app/routes/note.routes.js', './app/routes/user.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});