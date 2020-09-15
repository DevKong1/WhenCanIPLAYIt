const puppeteer = require("puppeteer");
const querystring = require("querystring")

//TODO Those ad Env variables
const proxyURL = "http://localhost:3000/";
var maxoffset = 5000;
var limit = 500;

function parseQuery(parsed) {
    var query = "";

    if (!("fields" in parsed)) {
        query += "fields *;";
    }

    for(key in parsed) {
        query += parsed[key];
    }

    return query;
}

async function downloadAllData(url, data, handleDataCallback, callbackParam = null) {
    var parsed = querystring.parse(data);
    var basicQuery = parseQuery(parsed);

    const browser = await puppeteer.launch( {
        headless: true,  //change to true in prod!
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }); 

    try {
        for(var i = 0; i < Math.ceil(maxoffset/limit); i++) {
            var page = await browser.newPage();
            await page.setRequestInterception(true);

            //const query = basicQuery + "limit " + limit + "; offset " + (limit * i) + ";";
            const query = basicQuery + "limit 1; offset " + (limit * i) + ";";
            page.on('request', interceptedRequest => {
                var data = {
                    'method': 'POST',
                    'postData': query
                };
        
                interceptedRequest.continue(data);
            });

            await page.goto(proxyURL + url);
            result = await page.evaluate(() =>  {    
                return JSON.parse(document.querySelector("body").innerText);   
            }); 
            
            //exit if there are no more results
            if(!Object.keys(result).length){
                break;
            }

            if(callbackParam != null) {
                handleDataCallback(callbackParam, result);
            } else {
                handleDataCallback(result);
            }
        }
    } catch (err) {
        console.error("PUPPETEER: " + err.message);
    } finally {
        await browser.close();
    }
};

exports.downloadAllData = downloadAllData;