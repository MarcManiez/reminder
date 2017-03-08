const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const activityController = require('../db/activity/activityController');
mongoose.connect('mongodb://localhost/reminder');

const db = mongoose.connection;
db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected to MongoDB');
});

const port = 8000;

const app = express();

app.listen(port);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.post('/home', activityController.newActivity);
app.put('/home/update', activityController.toggleStatus);
app.put('/home/updateModel', activityController.updateModel);
app.get('/home', activityController.getActivities);

module.exports = db;