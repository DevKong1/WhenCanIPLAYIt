module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var release_date_schema = new Schema({
        game:  Number,
        date: Number,
        human: String,
        m: Number,
        y: Number,
        platform: String,
        region: String
    });
    return mongoose.model('release_date_model', release_date_schema, 'release_dates');
};
