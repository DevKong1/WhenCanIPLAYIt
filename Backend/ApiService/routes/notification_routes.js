const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/NotificationsController");
const { requireAuth } = require("../auth/auth");

router
    .put("/mail", requireAuth, notificationsController.setMail);
    
module.exports = router;