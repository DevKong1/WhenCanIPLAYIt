/* const cron = require("node-cron")
const moment = require("moment")
const User = require("../../models/user_Model")
const Notification = require("../../models/user_notifications")

async function sendNotification(userId, payload) {
    // Retrieve subscriptions for the current user
    let subscriptions = await User.find({ _id: userId }).lean()
    // Send notification
    let payloadString = JSON.stringify(payload)
    for (subscription of subscriptions) {
        webpush
        .sendNotification(subscription, payloadString)
        .catch(e => console.error(e))
    }
}

async function scheduleNotifications() {
  cron.schedule("*\/1 * * * *", async () => {
    
  })
}

module.exports = scheduleNotifications
 */