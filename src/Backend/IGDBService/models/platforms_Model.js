const mongoose = require("mongoose");

const platform_schema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        dropDups: true
    }
});

module.exports = mongoose.model("platforms", platform_schema);
