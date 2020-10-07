const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

//Custom Imports
const IGDBService = require("./src/IGDBController.js");
const ProxyServer = require("./server.js");

var psw = "4dm1n15tr4t0r589";
var dbname = "WhenCanIPLAYIt";

async function startService() {
    // config
    dotenv.config();
    global.appRoot = path.resolve(__dirname);
    app.use('/static', express.static(__dirname + '/public'));
    mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });

    await ProxyServer.startProxy();

    //TODO other cron-job which deletes all games released over a month ago
    IGDBService.checkAndUpdateDB("*/30 * * * *");

    console.log("IGDBService started...")
}

startService();