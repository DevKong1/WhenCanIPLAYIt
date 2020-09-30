module.exports = function(mongoose, mongoosePaginate) {
    var Schema = mongoose.Schema;
    var genres_schema = new Schema({
        name:  {type: String, required: true},
        code: {type: String, required: true, dropDups: true}
    });
    genres_schema.plugin(mongoosePaginate);
    return mongoose.model('genres_model', genres_schema, 'genres');
};
