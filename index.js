var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');

var PORT = 3030;
global.appRoot = path.resolve(__dirname);

app.use(cors())

var routes = require('./src/components/routes');
routes(app);

app.listen(PORT, function () {
  console.log('Node API server started on port '+ PORT);
});