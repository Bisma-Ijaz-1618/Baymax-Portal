const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const chatController = require("../../controllers/chatController");

router
  .route("/:receiverId")
  .get(verifyRoles(ROLES_LIST.User), chatController.getChat);

router
  .route("/:receiverId")
  .put(verifyRoles(ROLES_LIST.User), chatController.saveChat);

module.exports = router;