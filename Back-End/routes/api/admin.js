const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");

router
  .route("/allAdmins")
  .get(verifyRoles(ROLES_LIST.Admin), adminController.getAllAdminProfiles);

router
  .route("/newAdmin")
  .post(verifyRoles(ROLES_LIST.Admin), adminController.createNewAdmin);

router
  .route("/updateAdmin")
  .put(verifyRoles(ROLES_LIST.Admin), adminController.updateAdminProfile);

router
  .route("/deleteAdmin/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), adminController.deleteAdminProfile);

router
  .route("/getAdmin")
  .get(verifyRoles(ROLES_LIST.Admin), adminController.getAllAdminProfiles);

router
  .route("/getActiveAdmins")
  .get(verifyRoles(ROLES_LIST.Admin), adminController.getAllAdminProfiles);

//exporting router
module.exports = router;
