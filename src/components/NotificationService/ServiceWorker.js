import axios from "axios"

const publicVapidKey = "BOuXIrNR1n2NvQ8JEWkpO34yqNt9RdyQAQNYMOCZP0UAQ4X1JGwbTiGFegLbYGvxsb5NFaYdlqjTsQM8IReoCHc"


async function registerServiceWorker() {
  // Check if service workers are supported
  if (!("serviceWorker" in navigator)) {
    throw "Service Workers are not supported"
  }

  // Register Service Worker
  log("Registering service worker")
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  })
  log("Service worker registered")

  // Grab service worker instance
  let serviceWorker
  if (register.installing) {
    serviceWorker = register.installing
  } else if (register.waiting) {
    serviceWorker = register.waiting
  } else if (register.active) {
    serviceWorker = register.active
  }

  if (serviceWorker) {
    log(`Service worker state: ${serviceWorker.state}`)
    // Immediatly subscribe for notifications if service worker is active
    if (serviceWorker.state == "activated") {
      await subscribeForPushNotification(register)
    } else {
      // Wait for service worker to be active before subscribing for notifications
      serviceWorker.addEventListener("statechange", async e => {
        log(`Service worker state: ${serviceWorker.state}`)
        if (e.target.state == "activated") {
          await subscribeForPushNotification(register)
        }
      })
    }
  }
}

async function subscribeForPushNotification(register) {
  // Register Push
  log("Registering push")
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  log("Push registered")

  // Subscribe to push notifications
  log("Sending subscription")
  log(subscription)
  await axios.post("http://localhost:3030/api/notifications/subscribe", subscription, { withCredentials: true })
  log("Subscription sent")
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
  .replace(/-/g, "+")
  .replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default registerServiceWorker