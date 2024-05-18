const express = require("express");
const router = express.Router();
const patientController = require("../../controllers/patientController");
const kitController = require("../../controllers/kitController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");

router.route("/:id").get(kitController.getKitTemp);

router
  .route("/MyRecords/All")
  .get(verifyRoles(ROLES_LIST.User), kitController.getMyRecords);
router
  .route("/MyRecords/View/:recordId")
  .get(verifyRoles(ROLES_LIST.User), kitController.getMyRecordById);
router
  .route("/PatientRecords/All/:patientId")
  .get(verifyRoles(ROLES_LIST.User), kitController.getPatientRecords);
router
  .route("/PatientRecords/View/:recordId")
  .get(verifyRoles(ROLES_LIST.User), kitController.getPatientRecordById);

module.exports = router;
