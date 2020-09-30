module.exports = function(mongoose, mongoosePaginate) {
    var Schema = mongoose.Schema;
    var platform_schema = new Schema({
        name:  {type: String, required: true},
        code: {type: String, required: true, dropDups: true}
    });
    platform_schema.plugin(mongoosePaginate);
    return mongoose.model('platform_model', platform_schema, 'platforms');
};
