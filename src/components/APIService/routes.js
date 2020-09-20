module.exports = function(app) {
    let APIController = require("./APIController.js");

    app.route("/api/releases")
        .get(APIController.releases);

    app.route("/api/games")
        .get(APIController.getGames);

    app.route("/api/games/:id")
        .get(APIController.getGame);

    app.route("/api/platforms")
        .get(APIController.getPlatforms);

    app.route("/api/genres")
        .get(APIController.getGenres);
};
