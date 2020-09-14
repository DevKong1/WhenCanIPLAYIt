var mongoose = require("mongoose")
var querystring = require("querystring")
var downloader = require("./IGDBDataDownloader.js")
Release_Dates = require("../../models/release_dates_Model.js")(mongoose);
Games = require("../../models/games_Model.js")(mongoose);

function checkAndAdd(entry, data) {
	if(!Object.keys(data).length){
		return;
	}

	var game = data[0];
	console.log(entry.game + " = " + game.name);
}

exports.handle_releasedatesJSON = function(data) {
	for(var entry in data) {

		Games.findById(data[entry].game, function(err, game) {
			if (err)
				console.log(err);
			else{
				if(movie==null){
					console.log("Game not found");
				}
				else{
					
					Release_Dates.find({game: data[entry].game, date = data[entry].date, })

				}
			}
		});

		downloader.downloadSingleResult( data[entry],
		"https://api-v3.igdb.com/games", 
        querystring.stringify({
            fields: "fields *;",
            where: "where id = " + data[entry].game + ";",
        }),
        checkAndAdd
    ); 
	}
};