const handler = require("./IDGBDataHandler.js")
const downloader = require("./IGDBDataDownloader.js")
const querystring = require("querystring")
const tools = require("../../utils/tools.js")

async function checkAndUpdateDB () {
    let now = new Date(Date.now());
    let time = tools.dateToSeconds(now.setDate(now.getDate() - 7));

    await downloader.downloadAllData("https://api-v3.igdb.com/release_dates", 
        querystring.stringify({
            fields: "fields *;",
            where: "where date >= " + time + ";",
            sort: "sort date asc;",
            limit: "limit 5;"
        }),
        handler.handle_releasedatesJSON
    ); 
}

exports.checkAndUpdateDB = checkAndUpdateDB;