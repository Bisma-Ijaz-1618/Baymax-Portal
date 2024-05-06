const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");

router
  .route("/allUsers")
  .get(verifyRoles(ROLES_LIST.User), UserController.getAllUsers);

router
  .route("/newUser")
  .post(verifyRoles(ROLES_LIST.Admin), UserController.createNewUser);

router.patch(
  verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin),
  UserController.updateUser
);

router
  .route("/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), UserController.deleteUser);

router
  .route("/getUser/:id")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    UserController.getUserData
  );

router
  .route("/getActiveUsers")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    UserController.getAllActiveUsers
  );

router.use("/follow", require("./follow"));

//exporting router
module.exports = router;
