const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/add")
  .post(verifyRoles(ROLES_LIST.User), userController.followAUser);

router
  .route("/remove")
  .post(verifyRoles(ROLES_LIST.User), userController.removeAFollower);

module.exports = router;
