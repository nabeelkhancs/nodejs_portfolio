const axios = require("axios");

module.exports.sendNotification = (notificationBody, deviceTokens) => {
  // Notification Object
  const notification = {
    title: "FamHQ",
    body: notificationBody,
  };

  // Devices Tokens
  const fcm_tokens = Array.isArray(deviceTokens)
    ? deviceTokens
    : [deviceTokens];
  // Data to Send to Google FCM
  const notification_body = {
    notification,
    registration_ids: fcm_tokens,
    sound: "default",
    data: {
      priority: "high",
      callType: "audio",
    },
    priority: "high",
    content_available: true,
  };

  // Send Request To Google FCMw
  axios({
    url: "https://fcm.googleapis.com/fcm/send",
    method: "post",
    headers: {
      Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`,
      "Content-Type": "application/json",
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      // priority: "high",
      // "apns-push-type": "background",
      // "apns-priority": "5",
    },
    data: JSON.stringify(notification_body),
  })
    .then((resp) => {
      console.log(resp.data);
      const returnVal = `Push Notification Sent ${resp.data}`;
      console.log(returnVal);
      return returnVal;
    })
    .catch((error) => {
      const returnVal = `Push Notification Sent Error: ${error}`;
      console.log(returnVal);
      return returnVal;
    });
};
