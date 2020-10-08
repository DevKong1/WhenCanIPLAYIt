const express = require("express")
const router = express.Router()
const APIController = require("../controllers/APIController")

router
	.get("/releases", APIController.releases)
	.get("/games", APIController.getGames)
	.get("/game/:id", APIController.getGame)
	.get("/platforms", APIController.getPlatforms)
	.get("/genres", APIController.getGenres);

module.exports = router;