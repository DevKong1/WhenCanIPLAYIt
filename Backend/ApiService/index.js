const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const session = require ("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const history = require('connect-history-api-fallback');

const app = express();

// .env
dotenv.config();

// Load Env variables
var PORT = process.env.PORT_API;
var psw = process.env.DB_PSW;
var dbname = process.env.DB_NAME;

// Passport config
require("./auth/passport")(passport)

// Mongoose
mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });

// Paths
global.appRoot = path.resolve(__dirname);

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

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors
app.use(cors({ credentials: true, origin: true }));


// Routes
const routes = require("./routes/user_routes");
const auth_routes = require("./routes/auth_routes");
const follow_routes = require("./routes/follow_routes");
const notification_routes = require("./routes/notification_routes");
app.use("/api", routes);
app.use("/api/auth", auth_routes);
app.use("/api/follow", follow_routes);
app.use("/api/notifications", notification_routes);

// Connect-hisory-api-fallback
app.use(history());
app.use(express.static("public"));

app.listen(PORT, function () {
	console.log('Node API server started on port '+ PORT);
});