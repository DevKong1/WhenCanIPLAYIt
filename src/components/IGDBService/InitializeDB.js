const express = require("express");
const puppeteer = require("puppeteer");
var fs = require('fs');

const proxyURL = "http://localhost:3000/"

//TODO MULTIPLE PAGES DOWNLOAD

async function run() {

    const browser = await puppeteer.launch( {
        headless: false  //change to true in prod!
    }); 
    
    var page = await browser.newPage(); 
    await page.setRequestInterception(true);

    const now = new Date(Date.now());
    const time = Math.floor((now.setDate(now.getDate() - 7)) / 1000);
    var offset = 0;
    var maxoffset = 5000
    var limit = 500;

    do {
        setQuery(page, time, offset, limit)

        await page.goto(proxyURL + "https://api-v3.igdb.com/release_dates");

        result = await page.evaluate(() =>  {    
            return JSON.parse(document.querySelector("body").innerText);   
        }); 
        
        offset += limit;
    } while (offset < maxoffset)

    saveFile(result);
    await browser.close(); 
};

function setQuery(page, time, offset, limit) {
    var query = "fields date,human,platform,region; where date >= " + time + "; limit " + limit + "; offset " +  offset + "; sort date asc;";

    page.on('request', interceptedRequest => {
        var data = {
            'method': 'POST',
            'postData': query
        };

        interceptedRequest.continue(data);
    });
}

async function saveFile(file) {
    fs.writeFile("IGDBdownload.json", JSON.stringify(file, null, "\t"), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}

run(); 