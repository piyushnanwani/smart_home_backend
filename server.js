require('rootpath')();
require('dotenv').config({ debug: process.env.DEBUG })

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// Configuring the database
// const connectionLocal = process.env.DB_LOCAL_HOST;
const connectionCloud = process.env.DB_CLOUD_HOST;
const mongoose = require('mongoose');

// fix for: depreciated warning :
// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` 
//option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false); 

mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(connectionLocal, {
  mongoose.connect(connectionCloud, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Smart Home backend application."});
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/device.routes.js')(app);

// listen for requests
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});