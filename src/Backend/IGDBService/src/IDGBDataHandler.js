const querystring = require("querystring");

const downloader = require("./IGDBDataDownloader.js");

const Release_Dates = require("../models/release_dates_Model");
const Games = require("../models/games_Model");
const Platforms = require("../models/platforms_Model");
const Genres = require("../models/genres_Model");

const category = [
    'main_game',
    'dlc_addon',
    'expansion',
    'bundle',
    'standalone_expansion',
    'mod',
    'episode',
    'season'
];
const regions = [
    'europe',
    'north_america',
    'australia',
    'new_zealand',
    'japan',
    'china',
    'asia',
	'worldwide',
	'undefined'
];

async function addGames(release_dates, data) {
	if(!Object.keys(data).length) {
		console.log("Empty IGDB response...");
		return;
	}
	
	//Check if we got all the data in the DB

	//Game cover
	let coverSet = [...new Set(data.filter(el => el.cover != null && el.cover != undefined).map(el => el.cover))];
	let covers = [];
	if(coverSet.length > 0) {
		covers = await getSpecificData("https://api.igdb.com/v4/covers", "fields url;", coverSet);

		if(covers == null || covers == undefined) {
			console.log("Error downloading data.");
			return;
		}

		covers.forEach(el => {
			el.url = el.url.replace("thumb", "cover_big");
		});
	}

	//Game genres
	let genresSet = [...new Set((data.filter(el => el.genres != null).map(el => el.genres)).flat(1))];
	let genres = [];
	if(genresSet.length > 0) {
		genres = await Genres.find(({code: {$in: genresSet} }), function(err, response) {
			if(err) {
				console.log(err);
			} else {
				return response;
			}
		});

		if(genresSet.length != genres.length) {
			let newGenres = genresSet.filter(el => !genres.map(el => el.code).includes(el.toString()));
			console.log("Downloading new genres: " + newGenres);
			let newGenresData = await getSpecificData("https://api.igdb.com/v4/genres", "fields name;", newGenres);

			for(i in newGenresData){
				let saved = await saveToDB(Genres, {
					name: newGenresData[i].name,
					code: newGenresData[i].id
				});
				genres.push({ id: saved.id, name: saved.name, code: saved.code});
			}
		}
	}

	//Game platforms
	let platformsSet = [...new Set((data.filter(el => el.platforms != null).map(el => el.platforms)).flat(1))];
	let platforms = [];
	if(platformsSet.length > 0) {
		platforms = await Platforms.find(({code: {$in: platformsSet} }), function(err, response) {
			if(err) {
				console.log(err);
			} else {
				return response;
			}
		});

		if(platformsSet.length != platforms.length) {
			let newPlatforms = platformsSet.filter(el => !platforms.map(x => x.code).includes(el.toString()));
			console.log("Downloading new platforms: " + newPlatforms);
			let newPlatformsData = await getSpecificData("https://api.igdb.com/v4/platforms", "fields name;", newPlatforms);

			for(i in newPlatformsData){
				let saved = await saveToDB(Platforms, {
					name: newPlatformsData[i].name,
					code: newPlatformsData[i].id
				});
				platforms.push({ id: saved.id, name: saved.name, code: saved.code});
			}
		}
	}

	//Game Screenshots
	let screenSet = [...new Set((data.filter(el => el.screenshots != undefined && el.screenshots.length > 0).map(el => el.screenshots)).flat(1))];
	let screenshots = [];
	if(screenSet.length > 0) {
		screenshots = await getSpecificData("https://api.igdb.com/v4/screenshots", "fields url;", screenSet);

		if(screenshots == null || screenshots == undefined) {
			console.log("Error downloading data.");
			return;
		}
		
		screenshots.forEach(el => {
			el.url = el.url.replace("thumb", "screenshot_big");
		});
	}

	//Save each game
 	for(i in data) {
		let element = data[i];
		let element_release_dates = release_dates.filter(el => el.game == element.id)

		let element_Genres = (genres.filter(x => element.genres != undefined && element.genres.map(el => el.toString()).includes(x.code))).map(x => x.id);
		let element_Platforms = (platforms.filter(x => element.platforms.map(el => el.toString()).includes(x.code)));
		let element_Screenshots = (screenshots.filter(x => element.screenshots != undefined && element.screenshots.includes(x.id))).map(el => el.url);
		
		//Save the item without calculated values
		let saved_item = await saveToDB(Games, {
			aggregated_rating: element.aggregated_rating,
			aggregated_rating_count: element.aggregated_rating_count,
			category: category[element.category],
			genres: element_Genres,
			name: element.name,
			platforms: element_Platforms.map(el => el.id),
			release_dates: [],
			screenshots: [], 
			time_to_beat: element.time_to_beat,
			summary: element.summary,
			code: element.id,
		});

		//Download Cover and Screenshot into the dir with Saved_Item ID
		let coverURL = covers.find(x => x.id == element.cover);
		if(coverURL != undefined) {
			coverURL = coverURL.url;
			let coverExt = coverURL.split('.');
			let element_cover_base = "cover/" + saved_item.id + "/cover." + coverExt[coverExt.length-1];
			let element_cover = "public/" + element_cover_base;
			await downloader.downloadImage("https:" + coverURL, element_cover, (err) => {
				if(err){
					console.log("Error downloading: " + err);
				}
			});
			
			saved_item.cover = element_cover_base;
		}
	
		//This downloads a huge quantity of Data, uncomment if needed
		for(j in element_Screenshots) {
			let extensionSS = element_Screenshots[j].split('.');
			let path_base = "screenshots/" + saved_item.id + "/" + j + "." + extensionSS[extensionSS.length-1];
			let pathSS = "public/" + path_base;
			downloader.downloadImage("https:" + element_Screenshots[j], pathSS, (err) => {
				if(err) {
					console.log("Error downloading: " + err);
				}
			});

			saved_item.screenshots.push(path_base.toString()); 
		} 

		//delete not update release dates
		element_release_dates.forEach( date => {
			element.release_dates = element.release_dates.filter(el => el._id == date._id || el.platform != date.platform || el.region != date.region ||
																(el._id != date._id &&
																 el.platform == date.platform && 
																 el.region == date.region && 
																 el.updated_at > consideredDate.updated_at));
		});

		for(release_date in element_release_dates){
			let consideredDate = element_release_dates[release_date];

			//Create release_date with all the calculated values
			let saved_release_date = await saveToDB(Release_Dates, {
				game: saved_item.id,
				date: consideredDate.date,
				category: consideredDate.category,
				human: consideredDate.human,
				m: consideredDate.m,
				y: consideredDate.y,
				dateAdded: consideredDate.created_at,
				platform: element_Platforms.find(el => el.code == consideredDate.platform).id,
				region: regions[consideredDate.region-1]
			});

			saved_item.release_dates.push(saved_release_date.id);
		}

		saved_item.save();
		console.log("Added game: [" + saved_item.id + " - " + saved_item.name + "]");
	}  
}

exports.handle_releasedatesJSON = async function(data) {
	let receivedGameIDs = data.map(el => el.game);
	//DEBUG ONLY
	//console.log("Got " + [...new Set(receivedGameIDs)].length + " games.");

	if(receivedGameIDs.length <= 0) {
		console.error("Error retrieving data.");
		return;
	}

	try {
		await Games.find({code: {$in: receivedGameIDs}}, async function(err, result) {
			if(err) {
				console.log(err);
			} else {
				let resultCodes = result.map(el => el.code);
				let newGames = data.filter(el => !resultCodes.includes(el.game.toString()));

				if(newGames.length > 0) {
					//Download all games for which we have no data
					console.log("Downloading new games:\n" + [...new Set(newGames.map(el => el.game))]);
					await downloader.downloadAllData("https://api.igdb.com/v4/games", 
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

				//Add new dates for the games which we already saved
				let resultIDs = result.map(el => el.id);
				let datesToCheck = data.filter(el => resultCodes.includes(el.game.toString()));
				let datesDB = await Release_Dates.find({game: {$in: resultIDs}}, function(err) {
					if(err) {
						console.log(err);
					}
				});
				let receivedPlatforms = [...new Set(datesToCheck.map(el => el.platform))];
				let platforms = await Platforms.find({code: {$in: receivedPlatforms}}, function(err) {
					if(err) {
						console.log(err);
					}
				});

				for(date in datesToCheck){
					let thisGame = result.find(el => el.code == datesToCheck[date].game.toString());
					let thisPlatform = platforms.find(el => el.code == datesToCheck[date].platform.toString());
					let thisRegion = regions[datesToCheck[date].region-1];

					//If the DB doenst have a date with the same values
					if(thisGame != undefined && thisPlatform != undefined &&
						datesDB.filter(el => el.game == thisGame.id &&
						el.date == datesToCheck[date].date && 
						el.platform == thisPlatform.id &&
						el.region == thisRegion).length <= 0) {

						let oldDates = datesDB.filter(el => el.game == thisGame.id &&
							el.platform == thisPlatform.id &&
							el.region == thisRegion &&
							el.dateAdded < datesToCheck[date].updated_at);
						
						oldDates.forEach(async date => {
							await Release_Dates.deleteOne({_id: date._id});
							await Games.findOneAndUpdate({code: thisGame.id}, {
								$pull: {
									"release_dates": date._id
								}
							});
						});					

						let saved_release_date = await saveToDB(Release_Dates, {
						game: thisGame.id,
						date: datesToCheck[date].date,
						category: datesToCheck[date].category,
						human: datesToCheck[date].human,
						m: datesToCheck[date].m,
						y: datesToCheck[date].y,
						platform: thisPlatform.id,
						dateAdded: datesToCheck[date].updated_at,
						region: thisRegion
						});

						let updatedGame = await Games.findByIdAndUpdate(thisGame.id, {
							$push: {
								"release_dates": saved_release_date.id
							}
						}, function(err,saved) {
							if(err) {
								console.log(err);
							}
						});

						console.log("Added new date: " + saved_release_date.human + " - " + updatedGame.name + " - " + thisPlatform.name + " - " + thisRegion);
					}
				}
			}			
		});	
	} catch(err) {
		console.log("Error downloading games: " + err);
	}
};

async function getSpecificData(url, fields, collection) {
	return downloader.downloadAllData(url, 
		querystring.stringify({
			fields: fields,
			where: "where id = (" + collection + ");",
		})
	);
}

async function saveToDB(collection, schema) {
	let new_item = new collection(schema);
	let saved_item = await new_item.save();	
	return saved_item;
}
