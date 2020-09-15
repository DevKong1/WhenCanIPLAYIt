var mongoose = require("mongoose");
const { release } = require("os");
var querystring = require("querystring")
var downloader = require("./IGDBDataDownloader.js")
Release_Dates = require("../../models/release_dates_Model.js")(mongoose);
Games = require("../../models/games_Model.js")(mongoose);
Platforms = require("../../models/platforms_Model.js")(mongoose);

async function addGames(release_dates, data) {
	if(!Object.keys(data).length){
		return;
	}

	for(i in data) {
		var element = data[i];
		console.log("Saving: " + element.name + " - " + (release_dates.find(el => el.game == element.id).game));
	}
	/* for(var game in data) {
		var new_game = new Games({
			aggregated_rating: data[game].aggregated_rating,
			aggregated_rating_count: data[game].aggregated_rating_count,
			category: data[game].category,
			cover: data[game].cover,
			genres: data[game].genres,
			involved_companies: [],
			name: data[game].name,
			release_dates: [],
			screenshots: data[game].screenshots,
			time_to_beat: data[game].time_to_beat,
			summary: data[game].summary,
			code: data[game].id,
		});
		new_game.save(function(err, saved) {
			if (err) {
				console.log("Error saving " + data[game].name + " : " + err)
			}
			console.log("SAVED " + saved.name + " : " + saved.code );
		});		
	} */
}

exports.handle_releasedatesJSON = async function(data) {
	var receivedGameIDs = data.map(el => el.game);

	await Games.find(({code: {$in: receivedGameIDs} }), function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var resultGames = result.map(el => el.game);
			var newGames = data.filter(el => !resultGames.includes(el.game));
			
			if(newGames.length > 0) {
				downloader.downloadAllData("https://api-v3.igdb.com/games", 
					querystring.stringify({
						fields: "fields *;",
						where: "where id = (" + [...new Set(newGames.map(el => el.game))] + ");",
					}),
					addGames,
					newGames
				);
			}
		}			
	});	
};