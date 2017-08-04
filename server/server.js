const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ejs = require('ejs');
const port = process.env.PORT || 3001;

const database = 'mongodb://localhost:27017/GPSuivieFact-mean-angularjs';

mongoose.Promise = global.Promise;
// mongoDB connection
const promise = mongoose.connect(database, {
  useMongoClient: true,
});
promise.then((db, err) => {
  if (err) return console.log(err);
  console.log('Successfully connected to mongoDb:' + database);
});

// Set app
const app = express();

// set routes
const client = require('./routes/client')(router);
const devis = require('./routes/devis')(router);
const factureGlobal = require('./routes/factureGlobal')(router);
const factureMois = require('./routes/factureMois')(router);

// MIDDLEWARE
// log into console (dev)
app.use(logger('dev'));
// Allows cross origin in development only
//app.use(cors({ origin: 'http://localhost:4200' }));
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// View engine
app.set('view engine', 'ejs');
app.set('ejs', 'html');
// Set Static Folder
const staticFolder = '../client/index.html';
app.use(express.static(path.join(__dirname, staticFolder)));

// use routes
app.use('/api', client);
app.use('/api', devis);
app.use('/api', factureGlobal);
app.use('/api', factureMois);

// allow to refresh page
// send back to ./client/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, staticFolder));
});

// Start Server: Listen on port
app.listen(port, () => {
  console.log('Listening on port ' + port);
});