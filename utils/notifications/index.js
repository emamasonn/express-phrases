const urlsafeBase64 = require("urlsafe-base64");
const webpush = require("web-push");
const vapid = require("../../vapid.json");

webpush.setVapidDetails(
  "mailto:emamasonn@gmail.com",
  vapid.publicKey,
  vapid.privateKey
);

const getKeyPublic = () => {
  return urlsafeBase64.decode(vapid.publicKey);
};

const addSubscription = (subscription) => {
  subscriptions.push(subscription);
};

const sendNotificationPush = (post, subscriptions = []) => {
  console.log("[post]: ", post);
  console.log("[subscriptions]", subscriptions);
  const subscriptionsError = [];

  subscriptions.forEach((subscription, i) => {
    webpush
      .sendNotification(subscription, JSON.stringify(post))
      .catch((error) => {
        if (error.statusCode === 410) {
          // delete subscription in the DB
          subscriptionsError.push(subscription);
        }
      });
  });
};

module.exports = {
  getKeyPublic,
  addSubscription,
  sendNotificationPush,
};
