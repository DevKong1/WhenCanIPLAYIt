const nodemailer = require("nodemailer");
const moment = require("moment");
const axios = require("axios");
const hbs = require("nodemailer-express-handlebars");
const User = require("./models/user_Model");

async function dailyReminder() {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.use("compile", hbs({
        viewEngine: {
          extname: ".handlebars",
          defaultLayout: null,
          partialsDir: "./hbs_views/partials"
        },
        viewPath: "./hbs_views/"
      }))
 
    let from = moment().startOf("day").unix();
    let to = moment().endOf("day").unix();

    let { data } = await axios.get("http://localhost:3030/api/releases", {
        params: {
            "from": from,
            "to": to,
            "category": 0
        }
    });

    let users = await User.find({"datesFollowed": {
        $in: data.map(el => el._id)
    }, "mailNotifications": true});

    users.forEach(user => {
        let mailDates = data.filter(el => user.datesFollowed.includes(el._id.toString()));

        let mailOptions = {
            from: process.env.MAIL,
            to: user.mail,
            subject: "WhenCanYouPLAYIt release reminder",
            template: "dailyReminder",
            context: {
                nick: user.nickname,
                dates: mailDates
            },
            attachments: [{
                filename: 'logo.png',
                path: __dirname +'/public/logo.png',
                cid: 'logo'
            }]
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });  
    });
}

exports.dailyReminder = dailyReminder;