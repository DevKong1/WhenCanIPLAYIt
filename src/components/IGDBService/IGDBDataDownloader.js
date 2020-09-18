const puppeteer = require("puppeteer");
const querystring = require("querystring")
const fspath = require('fs-path')
const fetch = require("node-fetch");

//TODO Those ad Env variables
const proxyURL = "http://localhost:3000/";
var maxoffset = 5000;
var limit = 500;

async function downloadAllData(url, data, handleDataCallback = null, callbackParam = null) {
    let parsed = querystring.parse(data);
    let basicQuery = parseQuery(parsed);

    const browser = await puppeteer.launch( {
        headless: true,  //change to true in prod!
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }); 

    try {
        let allResults = [];
        for(let i = 0; i < Math.ceil(maxoffset/limit); i++) {
            let page = await browser.newPage();
            await page.setRequestInterception(true);

            let query;
            if(basicQuery.includes("limit")) {
                query = basicQuery + "offset " + (limit * i) + ";";
            } else {
                query = basicQuery + "limit " + limit + "; offset " + (limit * i) + ";";
            }

            page.on('request', interceptedRequest => {
                let data = {
                    'method': 'POST',
                    'postData': query
                };
        
                interceptedRequest.continue(data);
            });

            await page.goto(proxyURL + url);
            let result = await page.evaluate(() =>  {    
                return JSON.parse(document.querySelector("body").innerText);   
            }); 
            
            //exit if there are no more results
            if(!Object.keys(result).length){
                break;
            }

            allResults.push(result);       
        }

        allResults = allResults.flat(1);
        if(handleDataCallback != null) {
            if(callbackParam != null) {
                handleDataCallback(callbackParam, allResults);
            } else {
                handleDataCallback(allResults);
            }
        } else {
            return allResults;
        }
    } catch (err) {
        console.error("PUPPETEER: " + err.message);
    } finally {
        await browser.close();
    }
};

async function downloadImage(url, path, callback) {
    const fetch_retry = async (url, n = 5) => {
        try {
            return await fetch(url)
        } catch(err) {
            if (n === 1) throw err;
            return await fetch_retry(url, n - 1);
        }
    };
    
	const response = await fetch_retry(url);
	const buffer = await response.buffer();
	fspath.writeFile(path, buffer, callback);
}

function parseQuery(parsed) {
    let query = "";

    if (!("fields" in parsed)) {
        query += "fields *;";
    }

    for(key in parsed) {
        query += parsed[key];
    }

    return query;
};

exports.downloadAllData = downloadAllData;
exports.downloadImage = downloadImage;