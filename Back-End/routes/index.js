const express = require("express");
const router = express.Router();
const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");
//user req / or index

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/upload", require("./api/fileUpload"));

router.use("/auth", require("./api/auth"));

router.use(verifyJWT);

router.use("/Users", require("./api/users"));
router.use("/Doctors", require("./api/doctor"));
router.use("/Admins", require("./api/admin"));
router.use("/Patients", require("./api/patient"));
router.use("/Appointments", require("./api/appointment"));
router.use("/follow", require("./api/users"));

//exporting router
module.exports = router;
