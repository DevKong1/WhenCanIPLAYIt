const User = require("../models/user_Model");

exports.followDate = async function(req, res) {
    try {
        let user = await User.findByIdAndUpdate(res.req.user._id, {
            $push: {
                "datesFollowed": req.body[0]
            }
        }, {new: true}); 
        res.json(user);
    } catch (e) {
        res.status(500).json({ description: e });
    }
};

exports.unfollowDate = async function(req, res) {
    try {
        let user = await User.findByIdAndUpdate(res.req.user._id, {
            $pull: {
                "datesFollowed": req.body[0]
            }
        }, {new: true}); 
        res.json(user);
    } catch (e) {
        res.status(500).json({ description: e });
    }
};