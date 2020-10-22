const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Custom Imports
const IGDBService = require("./src/IGDBController.js");
const ProxyServer = require("./server.js");

dotenv.config();
var psw = process.env.DB_PSW;
var dbname = process.env.DB_NAME;

async function startService() {
    global.appRoot = path.resolve(__dirname);
    app.use('/static', express.static(__dirname + '/public'));
    mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });

    await ProxyServer.startProxy();

    IGDBService.checkAndUpdateDB("0 0 * * *");

    console.log("IGDBService started...")
}

startService();