// Imports

const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})

var forceSsl = require('force-ssl-heroku');
var bodyParser = require("body-parser");

// Server config

const API_PORT = 3001;
const app = express();
const router = express.Router();

var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

// app.use(logger('dev'));
app.use(cors());
app.use(forceSsl);


// Mongoose models
const Road = require('./models/road');


// this is our MongoDB database
var useLiveProductionDBLocally = false; // SET TO TRUE FOR TESTING PURPOSES ONLY IF YOU WANT TO USE THE LIVE PRODUCTION DB
var dbRoute = "mongodb://localhost/coronafriend";
if ( (process.env.NODE_ENV === 'production' || useLiveProductionDBLocally) && process.env.MONGODB_URI ) {
  dbRoute = process.env.MONGODB_URI;
}

// connects our back end code with the database
mongoose.set('useFindAndModify', false);
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => {
  
  console.log('connected to the database');
  
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/* API methods used by the React App */


// test method
router.get('/test', jsonParser, (req, res) => {
  return res.send("Test Working");
});


// Method to store new information entered by the user when they make a new claim on a road
router.post('/claimRoad', jsonParser, (req, res) => {

  claimRoad(req, res);

});

function claimRoad(res) {

  return res.json({});

}


/* Other stuff to make it work */

// append /api for our http requests
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  console.log("in production");
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', jsonParser, (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
  });
}

// launch our backend into a port
app.listen((process.env.PORT || API_PORT), () => console.log(`LISTENING ON PORT ${process.env.PORT || API_PORT}`));
