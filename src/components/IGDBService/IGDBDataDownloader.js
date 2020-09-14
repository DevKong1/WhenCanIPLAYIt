const puppeteer = require("puppeteer");
const axios = require("axios");
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

async function downloadAllData(url, data, handleDataCallback) {
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

            const query = basicQuery + "limit " + limit + "; offset " + (limit * i) + ";";
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

            handleDataCallback(result);
        }
    } catch (err) {
        console.error(err.message);
    } finally {
        await browser.close();
    }
};

function downloadSingleResult(request, url, data, callback) {
    var parsedURL = proxyURL + url;
    var parsed = querystring.parse(data);
    var query = parseQuery(parsed);

    axios({
        method: 'post',
        url: parsedURL,
        data: query
        })
        .then(response => callback(request, (response.data)))
        .catch(err => console.error(err));
}

exports.downloadAllData = downloadAllData;
exports.downloadSingleResult = downloadSingleResult;