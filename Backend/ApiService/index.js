const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const session = require ("express-session")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")
const passport = require("passport")
const webpush = require("web-push")

// TODO ENV
var PORT = 3030;
var psw = "4dm1n15tr4t0r589"
var dbname = "WhenCanIPLAYIt"

const app = express();

// Passport config
require("./auth/passport")(passport)

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

// Cors
app.use(cors({ credentials: true, origin: true }));

// Routes
const routes = require("./routes/user_routes");
const auth_routes = require("./routes/auth_routes");
app.use("/api", routes);
app.use("/api/auth", auth_routes);

// Configure web push
webpush.setVapidDetails(
	"mailto:test@test.com",
	"BOuXIrNR1n2NvQ8JEWkpO34yqNt9RdyQAQNYMOCZP0UAQ4X1JGwbTiGFegLbYGvxsb5NFaYdlqjTsQM8IReoCHc",
	"NUu8XBljVZ-EQoI-w9oOHvp-ramA2dzoKiJLCecdcRk"
)

app.listen(PORT, function () {
	console.log('Node API server started on port '+ PORT);
});