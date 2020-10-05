const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/user_Model");
const { requireAuth, requireGuest } = require("../LoginService/Middleware/auth")

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
	
	app.route("/api/auth/google")
	.get(requireGuest, passport.authenticate("google", { scope: ["profile", "email"] }));

	app.route("/api/auth/google/callback")
	.get(passport.authenticate("google", {
		failureRedirect: process.env.FRONTEND_URL
	}),
	(req, res) => {
		let url = process.env.FRONTEND_URL + "?loginSuccessful=true";
		res.redirect(url);
	});
	
	app.route("/api/auth/logout")
	.get(requireAuth, (req, res) => {
		try {
			let url = process.env.FRONTEND_URL + "?logout=true";
			req.logout();+
			res.redirect(url);
		} catch (e) {
			res.status(500).json({ description: e });
		}
	});
	
	app.route("/api/auth/user")
	.get(requireAuth, async (req, res) => {
		try {
			let user = await User.findOne({ _id: res.req.user._id }).lean();
			res.json(user);
		} catch (e) {
			res.status(500).json({ description: e });
		}
	});

	app.route("/api/notifications/subscribe")
	.post(requireAuth, async (req, res) => {
		const subscription = req.body
		try {
		  // Save subscription to DB
		  subscription.expirationTime = moment().add(1, "d")
		  subscription.user = req.user._id
		  await Subscription.deleteMany({ endpoint: subscription.endpoint })
		  await Subscription.create(subscription)
		  // Send 201 - resource created
		  res.status(201).send()
		} catch (e) {
		  console.error(e)
		  res.status(500).send({ description: e })
		}
	  });
	
	  app.route("/api/notifications/test")
	  .get(requireAuth, async (req, res) => {
		try {
		  await sendNotification(req.user._id, {
			title: "Push test title",
			body: "Push test body"
		  })
		  res.status(201).send()
		} catch (e) {
		  console.error(e)
		  res.status(500).send({ description: e })
		}
	  });

};
