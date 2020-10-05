const mongoose = require("mongoose")

const Schema = mongoose.Schema;
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
        type: [Schema.ObjectId],
        default: []
    },
    gamesFollowed: {
        type: [Schema.ObjectId],
        default: []
    }
});

module.exports = mongoose.model("users", user_schema)
