module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var genres_schema = new Schema({
        name:  {type: String, required: true},
        code: {type: String, required: true, dropDups: true}
    });
    return mongoose.model('genres_model', genres_schema, 'genres');
};
