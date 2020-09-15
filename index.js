var express = require('express');
var app = express();
var dotenv = require("dotenv");
var path = require("path");
var cors = require("cors");
var mongoose = require("mongoose")

//Custom Imports
var IGDBService = require("./src/components/IGDBService/IGDBController.js")

//TODO ENV
var PORT = 3030;
var psw = "4dm1n15tr4t0r589"
var dbname = "WhenCanIPLAYIt"

//config
dotenv.config();
mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });
global.appRoot = path.resolve(__dirname);

app.use(cors())

var routes = require('./src/components/routes');
routes(app);

IGDBService.checkAndUpdateDB();

app.listen(PORT, function () {
  console.log('Node API server started on port '+ PORT);
});