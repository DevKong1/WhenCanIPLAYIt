const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const session = require ("express-session")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")
const passport = require("passport")
const webpush = require("web-push")

//Custom Imports
const IGDBService = require("./src/components/IGDBService/IGDBController.js")
const ProxyServer = require("./server.js")

// TODO ENV
var PORT = 3030;
var psw = "4dm1n15tr4t0r589"
var dbname = "WhenCanIPLAYIt"

// Passport config
require("./src/components/LoginService/passport")(passport)

// config
dotenv.config();
mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });
global.appRoot = path.resolve(__dirname);
app.use('/static', express.static(__dirname + '/public'));

// Session
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ credentials: true, origin: true }));
ProxyServer.startProxy();

var routes = require('./src/components/APIService/routes.js');
routes(app);

 // Configure web push
 webpush.setVapidDetails(
  "mailto:test@test.com",
  "BOuXIrNR1n2NvQ8JEWkpO34yqNt9RdyQAQNYMOCZP0UAQ4X1JGwbTiGFegLbYGvxsb5NFaYdlqjTsQM8IReoCHc",
  "NUu8XBljVZ-EQoI-w9oOHvp-ramA2dzoKiJLCecdcRk"
)

//TODO other cron-job which deletes all games released over a month ago
IGDBService.checkAndUpdateDB("*/30 * * * *");

app.listen(PORT, function () {
  console.log('Node API server started on port '+ PORT);
});