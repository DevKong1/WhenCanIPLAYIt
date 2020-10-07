const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user_Model");
const { requireAuth, requireGuest } = require("../auth/auth");

router
	.get("/google", requireGuest, passport.authenticate("google", { scope: ["profile", "email"] }))
	.get("/google/callback", passport.authenticate("google", {
            failureRedirect: process.env.FRONTEND_URL
        }),
        (req, res) => {
            let url = process.env.FRONTEND_URL + "?loginSuccessful=true";
            res.redirect(url);
        })	
	.get("/logout", requireAuth, (req, res) => {
		try {
			let url = process.env.FRONTEND_URL + "?logout=true";
			req.logout();+
			res.redirect(url);
		} catch (e) {
			res.status(500).json({ description: e });
		}
	})
	.get("/user", requireAuth, async (req, res) => {
		try {
			let user = await User.findOne({ _id: res.req.user._id }).lean();
			res.json(user);
		} catch (e) {
			res.status(500).json({ description: e });
		}
    });
    
module.exports = router;