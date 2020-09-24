const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose")

//Custom Imports
const IGDBService = require("./src/components/IGDBService/IGDBController.js")
const ProxyServer = require("./server.js")

//TODO ENV
var PORT = 3030;
var psw = "4dm1n15tr4t0r589"
var dbname = "WhenCanIPLAYIt"

//config
dotenv.config();
mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });
global.appRoot = path.resolve(__dirname);
app.use('/static', express.static(__dirname + '/public'));

app.use(cors());
ProxyServer.startProxy();

var routes = require('./src/components/APIService/routes.js');
routes(app);

//TODO other cron-job which deletes all games released over a month ago
IGDBService.checkAndUpdateDB("*/30 * * * *");

app.listen(PORT, function () {
  console.log('Node API server started on port '+ PORT);
});