const mongoose = require("mongoose");

const release_date_schema = new mongoose.Schema({
    game:  {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'games', 
        required: true
    },
    date: {
        type: Number, 
        required: true
    },
    category: {
        type: Number, 
        required: true
    },
    human: String,
    m: Number,
    y: Number,
    dateAdded: {
        type: Number, 
        required: true
    },
    platform: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'platforms',
        required: true
    },
    region: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model("release_dates", release_date_schema);

/*  CATEGORY: 
YYYYMMMMDD 	0
YYYYMMMM 	1
YYYY 	    2
YYYYQ1 	    3
YYYYQ2 	    4
YYYYQ3 	    5
YYYYQ4 	    6
TBD 	    7 
*/