module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var platform_schema = new Schema({
        name:  String,
        code: String
    });
    return mongoose.model('platform_model', platform_schema, 'platforms');
};
