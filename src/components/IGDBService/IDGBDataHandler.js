var mongoose = require("mongoose");
var querystring = require("querystring")
var downloader = require("./IGDBDataDownloader.js")
Release_Dates = require("../../models/release_dates_Model.js")(mongoose);
Games = require("../../models/games_Model.js")(mongoose);
Platforms = require("../../models/platforms_Model.js")(mongoose);
Genres = require("../../models/genres_Model.js")(mongoose);

const category = [
    'main_game',
    'dlc_addon',
    'expansion',
    'bundle',
    'standalone_expansion',
    'mod',
    'episode',
    'season',
];

async function addGames(release_dates, data) {
	if(!Object.keys(data).length) {
		return;
	}

	let coverSet = [...new Set(data.filter(el => el.cover != null).map(el => el.cover))];
	let covers = await getSpecificData("https://api-v3.igdb.com/covers", "fields url;", coverSet);

	let genresSet = [...new Set((data.map(el => el.genres)).flat(1))];
	let genresFromDB = await Genres.find(({code: {$in: genresSet} }), function(err, response) {
		if(err) {
			console.log(err);
		} else {
			return response;
		}
	});

	if(genresSet.length != genresFromDB.length) {
		let newGenres = 
	}

	let involved_companies = await getSpecificData("https://api-v3.igdb.com/involved_companies", "fields *;", [...new Set((data.filter(el => el.involved_companies != null).map(el => el.involved_companies)).flat(1))]);
	let screenSet = [...new Set((data.filter(el => el.screenshots.length > 0).map(el => el.screenshots)).flat(1))];
	let screenshots = await getSpecificData("https://api-v3.igdb.com/screenshots", "fields url;", screenSet);
	
 
 	for(i in data) {
		let element = data[i];
		let release_date = release_dates.find(el => el.game == element.id)

		element_Cover = covers.find(x => x.id == element.cover);
		if(element_Cover != undefined) {
			element_Cover = element_Cover.url.replace("thumb", "cover_big");
		} else {
			element_Cover = null;
		}

		saveToDB(Games, {
			aggregated_rating: element.aggregated_rating,
			aggregated_rating_count: element.aggregated_rating_count,
			category: category[element.category],
			cover: element_Cover,
			genres: (genres.filter(x => element.genres.includes(x.id))).map(x => x.name),
			involved_companies: [],
			name: element.name,
			release_dates: [],
			screenshots: (screenshots.filter(x => element.screenshots.includes(x.id))).map(el => el.url),
			time_to_beat: element.time_to_beat,
			summary: element.summary,
			code: element.id,
		});
	}
}

async function getSpecificData(url, fields, collection) {
	return downloader.downloadAllData(url, 
		querystring.stringify({
			fields: fields,
			where: "where id = (" + collection + ");",
		})
	);
}

function saveToDB(collection, schema) {
	let new_item = new collection(schema);

	new_item.save(function(err, saved) {
		if (err) {
			console.log("Error saving: " + err)
		}
		console.log("SAVED " + saved.code + " - " + saved.name);
	});	  
}

exports.handle_releasedatesJSON = async function(data) {
	console.log("Received these games:\n" + data.map(el => el.game));
	let receivedGameIDs = data.map(el => el.game);

	await Games.find(({code: {$in: receivedGameIDs} }), function(err, result) {
		if(err) {
			console.log(err);
		} else {
			let resultGames = result.map(el => el.code);
			let newGames = data.filter(el => !resultGames.includes(el.game.toString()));
			console.log("Downloading these games:\n" + [...new Set(newGames.map(el => el.game))]);
			if(newGames.length > 0) {
				downloader.downloadAllData("https://api-v3.igdb.com/games", 
					querystring.stringify({
						fields: "fields *;",
						where: "where id = (" + [...new Set(newGames.map(el => el.game))] + ");",
					}),
					addGames,
					newGames
				);
			} else {
				console.log("There wasn't any new game.");
			}
		}			
	});	
};