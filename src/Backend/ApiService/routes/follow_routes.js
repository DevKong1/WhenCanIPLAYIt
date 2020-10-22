const express = require("express");
const router = express.Router();
const followController = require("../controllers/FollowController");
const { requireAuth } = require("../auth/auth");

router
    .post("/date", requireAuth, followController.followDate)
    .put("/date", requireAuth, followController.unfollowDate);
    
module.exports = router;