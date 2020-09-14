module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var game_schema = new Schema({
        aggregated_rating: Number,
        aggregated_rating_count: Number,
        category: String,
        cover: {type: String, default: "none"},
        genres: [String],
        involved_companies: [Schema.ObjectId],
        name: String,
        release_dates: [Schema.ObjectId],
        screenshots: [String],
        time_to_beat: Number,
        summary: String,
        code: String

    });
    return mongoose.model('games_model', game_schema, 'games');
};
