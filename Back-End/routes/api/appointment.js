const express = require("express");
const router = express.Router();
const AppointmentController = require("../../controllers/appointmentController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/new")
  .post(verifyRoles(ROLES_LIST.User), AppointmentController.createAppointment);
router
  .route("/update/:id")
  .put(verifyRoles(ROLES_LIST.User), AppointmentController.updateAppointment);

router
  .route("/allDoctor")
  .get(
    verifyRoles(ROLES_LIST.User),
    AppointmentController.getAppointmentsByUserId
  );
router
  .route("/allPatient")
  .get(
    verifyRoles(ROLES_LIST.User),
    AppointmentController.getAppointmentsByUserId
  );

router
  .route("/all/:userId")
  .get(
    verifyRoles(ROLES_LIST.User),
    AppointmentController.getAppointmentsByUserId
  );

router
  .route("/status/:status")
  .get(
    verifyRoles(ROLES_LIST.User),
    AppointmentController.getAppointmentsByStatus
  );
router
  .route("/delete")
  .delete(
    verifyRoles(ROLES_LIST.User),
    AppointmentController.deleteAppointment
  );

module.exports = router;
