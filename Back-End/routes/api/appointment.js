const express = require("express");
const router = express.Router();
const AppointmentController = require("../../controllers/appointmentController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/allAppointments")
  .get(verifyRoles(ROLES_LIST.User), AppointmentController.getAllAppointments);

router
  .route("/:id")
  .get(
    verifyRoles(ROLES_LIST.Doctor, ROLES_LIST.Patient),
    AppointmentController.getAppointmentById
  );

router
  .route("/newAppointment")
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    AppointmentController.createAppointment
  );

router
  .route("/updateAppointment/:id")
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    AppointmentController.updateAppointmentById
  );

router
  .route("/deleteAppointment/:id")
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    AppointmentController.deleteAppointmentById
  );

router
  .route("/getAppointmentsByUser/:userId")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor),
    AppointmentController.getAppointmentsByUserId
  );

router
  .route("/getAppointmentsByPatient/:patientId")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Doctor, ROLES_LIST.Patient),
    AppointmentController.getAppointmentsByPatientId
  );

// Additional routes can be added based on your requirements

// Exporting router
module.exports = router;
