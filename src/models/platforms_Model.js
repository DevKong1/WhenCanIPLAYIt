module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var platform_schema = new Schema({
        name:  {type: String, required: true},
        code: {type: String, required: true, dropDups: true}
    });
    return mongoose.model('platform_model', platform_schema, 'platforms');
};
