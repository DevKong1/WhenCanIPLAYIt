module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var release_date_schema = new Schema({
        game:  {type: Schema.ObjectId, ref: 'games_model', required: true},
        date: {type: Number, required: true},
        category: {type: Number, required: true},
        human: String,
        m: Number,
        y: Number,
        dateAdded: {type: Number, required: true},
        platform: {type: Schema.ObjectId, ref: 'platform_model',required: true},
        region: {type: String, required: true}
    });
    return mongoose.model('release_date_model', release_date_schema, 'release_dates');
};
