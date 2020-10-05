const mongoose = require("mongoose")

const SubscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  expirationTime: {
    type: Date,
    default: Date.now
  },
  keys: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
})

module.exports = mongoose.model("Subscription", SubscriptionSchema)