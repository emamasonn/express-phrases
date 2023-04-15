const { Router } = require("express");
const {
  postSubscription,
  getKey,
  pushNotification,
} = require("../controllers/notifications.controllers");

const router = Router();

router.post("/subscription", postSubscription);
router.post("/push", pushNotification);
router.get("/key", getKey);

module.exports = router;
