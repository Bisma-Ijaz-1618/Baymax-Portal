const express = require("express");
const router = express.Router();
const patientController = require("../../controllers/patientController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");

router
  .route("/allPatients")
  .get(verifyRoles(ROLES_LIST.User), patientController.getAllPatientProfiles);
router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), patientController.getPatientProfile);

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

//exporting router
module.exports = router;
