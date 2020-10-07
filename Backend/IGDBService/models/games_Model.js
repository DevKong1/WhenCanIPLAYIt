const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const game_schema = new mongoose.Schema({
    aggregated_rating: Number,
    aggregated_rating_count: Number,
    category: String,
    cover: {type: String, default: "default_cover.jpg"},
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genres_model'
    }],
    name: {
        type: String,
        required: true
    },
    platforms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'platform_model'
    }],
    release_dates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'release_date_model'
    }],
    screenshots: [String],
    time_to_beat: Number,
    summary: String,
    code: {
        type: String,
        required: true,
        dropDups: true
    }
});
game_schema.plugin(mongoosePaginate);

module.exports = mongoose.model("games", game_schema);