const mongoose = require('mongoose');
const moment = require('moment');
Release_Dates = mongoose.model('release_date_model');
Games = mongoose.model('games_model');
Platforms = mongoose.model('platform_model');
Genres = mongoose.model('genres_model');

//DATES
exports.releases = function(req, res) {
    let query = {};

    if(req.query.from != null || req.query.to != null) {
        query["date"] = {}
        if(req.query.from != null){
            query["date"]["$gte"] = req.query.from;
        }
        if(req.query.to != null){
            query["date"]["$lt"] = req.query.to;
        }
        
    }
    if(req.query.recentlyAdded == true) {
        let now = new Date(Date.now());
        let nowSeconds = tools.dateToSeconds(now);
        let time = tools.dateToSeconds(now.setDate(now.getDate() - 7));
        query["dateAdded"] = {
            $gte: time,
            $lte: nowSeconds
        };
    }
    if(req.query.category != null) {
        query["category"] = { 
            $in: req.query.category
        };
    }
    if(req.query.platform != null) {
        query["platform"] = { 
            $in: req.query.platform
        };
    }
    if(req.query.region != null) {
        query["region"] = { 
            $in: req.query.region
        };
    }

    Release_Dates.find(query)
    .populate("game")
    .populate("platform", "name")
    .sort(req.query.sort != null ? req.query.sort : "date")
    .limit(req.query.limit != null ? Number(req.query.limit) : 0)
    .exec(function(err, dates) {
        if(err || dates == null) {
            res.send("Error");
        } else {
            res.json(dates);
        }
    }); 
};

//GAMES
exports.getGames = async function(req, res) {
    let query = {};
    
    let options = {
        page: req.query.page != null ? Number(req.query.page) : 1,
        limit: req.query.limit != null ? Number(req.query.limit) : 500,
        populate: ["release_dates","platforms","genres"],
        sort: req.query.sort != null ? req.query.sort : "",
    };

    if(req.query.released == "true") {
        let dates = await Release_Dates.find({category: 0, date: { $lte: moment().unix() }});
        query["release_dates"] = {
            $in: dates.map(el => el.id)
        };
    } else if (req.query.released == "false") {
        let dates = await Release_Dates.find({category: 0, date: { $gt: moment().unix() }});
        query["release_dates"] = {
            $in: dates.map(el => el.id)
        };
    } else if (req.query.released == "TBA") {
        let dates = await Release_Dates.find({category: {$ne: 0}});
        query["release_dates"] = {
            $in: dates.map(el => el.id)
        };
    }

    if(req.query.minrating != null && req.query.maxrating != null) {
        query["aggregated_rating"] = {
            $gte: req.query.minrating,
            $lte: req.query.maxrating
        };
    }
    if(req.query.category != null) {
        query["category"] = { 
            $in: req.query.category
        };
    }
    if(req.query.genres != null) {
        query["genres"] = { 
            $in: req.query.genres
        };
    }
    if(req.query.name != null) {
        query["name"] = { 
            $regex: req.query.name,
            $options: "i"
        };
    }
    if(req.query.platforms != null) {
        query["platforms"] = { 
            $in: req.query.platforms
        };
    }
    if(req.query.mintobeat != null && req.query.maxtobeat != null) {
        query["time_to_beat"] = {
            $gte: req.query.minrating,
            $lte: req.query.maxrating
        };
    }
    
    Games.paginate(query, options, function(err, games) {
        if(err || games == null) {
            res.send("Error");
        } else {
            res.json(games);
        }
    }); 
};
exports.getGame = function(req, res) {
    Games.findById(req.params.id)
    .populate("release_dates")
    .populate("platforms", "name")
    .populate("genres", "name")
    .exec(function(err, game) {
        if(err || game == null) {
            res.send("Error");
        } else {
            res.json(game);
        }
    }); 
};

//OTHER
exports.getPlatforms = function(req, res) {
    Platforms.find(req.query.platforms != null ? {id: {$in: req.query.platforms}} : {})
    .exec(function(err, platforms) {
        if(err || platforms == null) {
            res.send("Error");
        } else {
            res.json(platforms);
        }
    }); 
};
exports.getGenres = function(req, res) {
    Genres.find(req.query.genres != null ? {id: {$in: req.query.genres}} : {})
    .exec(function(err, genres) {
        if(err || genres == null) {
            res.send("Error");
        } else {
            res.json(genres);
        }
    }); 
};