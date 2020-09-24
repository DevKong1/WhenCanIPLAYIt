module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var game_schema = new Schema({
        aggregated_rating: Number,
        aggregated_rating_count: Number,
        category: String,
        cover: {type: String, default: "default_cover.jpg"},
        genres: [{type: Schema.ObjectId, ref: 'genres_model'}],
        name: {type: String, required: true},
        platforms: [{type: Schema.ObjectId, ref: 'platform_model'}],
        release_dates: [{type: Schema.ObjectId, ref: 'release_date_model'}],
        screenshots: [String],
        time_to_beat: Number,
        summary: String,
        code: {type: String, required: true, dropDups: true}

    });
    return mongoose.model('games_model', game_schema, 'games');
};
