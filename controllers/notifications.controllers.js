const { response, request } = require("express");
const { query } = require("../database/config");
const notification = require("../utils/notifications");

const postSubscription = (req = request, res = response) => {
  const { subscription, user_id } = req.body;
  const textQuery = `INSERT INTO subscriptions(subscription, user_id) values('${JSON.stringify(
    subscription
  )}', '${user_id}')`;
  query(textQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.json({ subscription, user_id });
    }
  });
};

const getKey = (req = request, res = response) => {
  const keyPublic = notification.getKeyPublic();
  res.send(keyPublic);
};

const pushNotification = (req = request, res = response) => {
  const notificationBody = {
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
  };

  const textQuery = `SELECT * FROM subscriptions`;

  query(textQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      const subscriptions = result.rows.map((sub) => sub.subscription);
      notification.sendNotificationPush(notificationBody, subscriptions);
    }
  });
  res.json(notificationBody);
};

module.exports = {
  postSubscription,
  getKey,
  pushNotification,
};
