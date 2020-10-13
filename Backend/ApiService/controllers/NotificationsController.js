const User = require("../models/user_Model");

exports.setMail = async function(req, res) {
    try {
        let user = await User.findByIdAndUpdate(res.req.user._id, {
            "mailNotifications": req.body[0]
        }, {new: true}); 
        res.json(user);
    } catch (e) {
        res.status(500).json({ description: e });
    }
};
