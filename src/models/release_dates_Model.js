module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var release_date_schema = new Schema({
        game:  Schema.ObjectId,
        date: Number,
        category: Number,
        human: String,
        m: Number,
        y: Number,
        platform: Schema.ObjectId,
        region: String
    });
    return mongoose.model('release_date_model', release_date_schema, 'release_dates');
};
