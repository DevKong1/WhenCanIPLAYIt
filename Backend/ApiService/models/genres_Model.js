const mongoose = require("mongoose");

const genres_schema = new mongoose.Schema({
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

module.exports = mongoose.model("genres", genres_schema);