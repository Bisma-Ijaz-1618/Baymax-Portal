const express = require("express");
const router = express.Router();
const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");
//user req / or index
const UserController = require("../controllers/usersController");
const kitController = require("../controllers/kitController");
//router.route("/sendSensorData").post(UserController.getData);
router.route("/sendSensorData").post(kitController.saveSensorData);
router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/uploadMedilcalFile", require("./api/fileUpload"));
//router.use("/update/data", console.log("here"));

router.use("/auth", require("./api/auth"));

router.use(verifyJWT);

router.use("/Kit", require("./api/kit"));
router.use("/Chat", require("./api/chat"));

router.use("/Users", require("./api/users"));
router.use("/Doctors", require("./api/doctor"));
router.use("/Admins", require("./api/admin"));
router.use("/Patients", require("./api/patient"));
router.use("/Appointments", require("./api/appointment"));
router.use("/follow", require("./api/users"));

//exporting router
module.exports = router;
