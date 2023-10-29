const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/login").post(authController.handleLogin);
router.route("/register").post(authController.handleNewUser);

verifyRoles(ROLES_LIST.User);

router.route("/logout").get(authController.handleLogout);
router.route("/refresh").get(authController.handleRefreshToken);

module.exports = router;
