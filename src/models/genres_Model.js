module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var genres_schema = new Schema({
        name:  String,
        code: String
    });
    return mongoose.model('genres_model', genres_schema, 'genres');
};
