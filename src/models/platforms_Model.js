module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var platform_schema = new Schema({
        name:  String,
        icon: String,
        code: String
    });
    return mongoose.model('plarform_model', platform_schema, 'platforms');
};
