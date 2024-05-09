const express = require("express");
const router = express.Router();
const patientController = require("../../controllers/patientController");
const kitController = require("../../controllers/kitController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), kitController.getKitTemp);

router
  .route("/MyRecords/All")
  .get(verifyRoles(ROLES_LIST.User), kitController.getMyRecords);
router
  .route("/MyRecords/View/:recordId")
  .get(verifyRoles(ROLES_LIST.User), kitController.getMyRecordById);

router
  .route("/UserRecords/All")
  .get(verifyRoles(ROLES_LIST.User), kitController.getAllUserRecords);
router
  .route("/UserRecords/View/:userId/:recordId")
  .get(verifyRoles(ROLES_LIST.User), kitController.getAllUserRecords);

router
  .route("/allPatients")
  .get(verifyRoles(ROLES_LIST.User), patientController.getAllPatientProfiles);
router
  .route("/newPatient")
  .post(verifyRoles(ROLES_LIST.Admin), patientController.createNewPatient);

router
  .route("/updatePatient/:id")
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Patient),
    patientController.updatePatientProfile
  );

router
  .route("/deletePatient/:id")
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    patientController.deletePatientProfile
  );

router
  .route("/getPatient")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Patient),
    patientController.getAllPatientProfiles
  );

router
  .route("/getActivePatients")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Patient),
    patientController.getAllPatientProfiles
  );

router
  .route("/getProfilePicture/:id")
  .get(patientController.getProfilePictureById);
router
  .route("/getProfilePicture")
  .get(verifyRoles(ROLES_LIST.Patient), patientController.getProfilePicture);

//exporting router
module.exports = router;
