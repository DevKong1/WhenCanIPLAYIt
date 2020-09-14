const handler = require("./IDGBDataHandler.js")
const downloader = require("./IGDBDataDownloader.js")
const querystring = require("querystring")
const tools = require("../../utils/tools.js")

function checkAndUpdateDB () {
    const now = new Date(Date.now());
    const time = tools.dateToSeconds(now.setDate(now.getDate() - 7));

    downloader.downloadAllData("https://api-v3.igdb.com/release_dates", 
        querystring.stringify({
            fields: "fields *;",
            where: "where date >= " + time + ";",
            sort: "sort date asc;"
        }),
        handler.handle_releasedatesJSON
    ); 
}

exports.checkAndUpdateDB = checkAndUpdateDB;