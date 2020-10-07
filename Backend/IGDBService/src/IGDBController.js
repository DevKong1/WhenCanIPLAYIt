const querystring = require("querystring");
const cron = require("node-cron");
const moment = require('moment');

const handler = require("./IDGBDataHandler.js");
const downloader = require("./IGDBDataDownloader.js");

async function checkAndUpdateDB (interval) {
//    cron.schedule(interval, async function() {
        let time = moment().subtract(7, "days").unix();

        await downloader.downloadAllData("https://api-v3.igdb.com/release_dates", 
            querystring.stringify({
                fields: "fields *;",
                where: "where date >= " + time + ";",
                sort: "sort date asc;"
            }),
            handler.handle_releasedatesJSON
        );
//    });
}

exports.checkAndUpdateDB = checkAndUpdateDB;