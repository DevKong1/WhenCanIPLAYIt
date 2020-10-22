const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    datesFollowed: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    mailNotifications: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model("users", user_schema);
