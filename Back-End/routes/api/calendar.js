const express = require("express");
const router = express.Router();
const CalendarController = require("../../controllers/calendarController");

router.route("/addEvent").post(CalendarController.addEvent);

router.route("/getEventList").get(CalendarController.getEventList);

router.route("/deleteEvent").patch(CalendarController.deleteEvent);

module.exports = router;
