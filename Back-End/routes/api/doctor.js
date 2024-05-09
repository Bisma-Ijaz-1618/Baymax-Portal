const express = require("express");
const router = express.Router();
const DoctorController = require("../../controllers/doctorController");
const DoctorProfileController = require("../../controllers/doctorProfileController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataProcessor = require("../../middleware/dataProcessor");
const User = require("../../model/User");
const imageUploader = require("../../middleware/imageUploader");

router.use("/Calendar", require("./calendar"));
router.use("/Appointments", require("./appointment"));

router
  .route("/allDoctors")
  .get(verifyRoles(ROLES_LIST.User), DoctorController.getAllDoctorProfiles);

router
  .route("/updateProfilePicture")
  .post(
    verifyRoles(ROLES_LIST.Doctor),
    imageUploader,
    DoctorProfileController.upadteProfilePicture
  );
router
  .route("/getProfilePicture/:id")
  .get(DoctorProfileController.getProfilePictureById);
router
  .route("/getProfilePicture")
  .get(
    verifyRoles(ROLES_LIST.Doctor),
    DoctorProfileController.getProfilePicture
  );

router
  .route("/MyProfile")
  .get(verifyRoles(ROLES_LIST.Doctor), DoctorProfileController.getMyProfile);

router
  .route("/doctor")
  .get(
    verifyRoles(ROLES_LIST.User),
    DoctorController.getAllDoctorListWithSchedule
  );

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), DoctorController.getDoctorProfile);

router
  .route("/newDoctor")
  .post(verifyRoles(ROLES_LIST.Admin), DoctorController.createNewDoctor);

router
  .route("/updateDoctor/:id")
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    DoctorController.updateDoctorProfile
  );

router
  .route("/deleteDoctor/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), DoctorController.deleteDoctorProfile);

router
  .route("/getDoctor")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    DoctorController.getAllDoctorProfiles
  );

router
  .route("/getActiveDoctors")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    DoctorController.getAllDoctorProfiles
  );

//exporting router
module.exports = router;
