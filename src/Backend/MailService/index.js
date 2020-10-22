const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const mailService = require("./MailService");
const cron = require("node-cron");


dotenv.config();
var psw = process.env.DB_PSW;
var dbname = process.env.DB_NAME;

// Mongoose
mongoose.connect('mongodb+srv://admin:' + psw + '@whencaniplayit.zqk4c.mongodb.net/' + dbname + '?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  });

// Paths
global.appRoot = path.resolve(__dirname);

cron.schedule("1 0 * * *", async () => {
    mailService.dailyReminder();
});