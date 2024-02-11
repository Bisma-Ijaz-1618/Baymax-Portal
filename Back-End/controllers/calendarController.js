const DoctorProfile = require("../model/Doctor");

const addEvent = async (req, res) => {
  const userId = req.userId;
  const { newEvent } = req.body;
  console.log("add event doctorID", req.params, req.body);

  try {
    const doctor = await DoctorProfile.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    doctor.events.push(newEvent);

    await doctor.save();

    return res.status(200).json(newEvent);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add event: " + error.message });
  }
};

// Get the event list for a doctor
const getEventList = async (req, res) => {
  const userId = req.userId;

  try {
    const doctor = await DoctorProfile.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    return res.status(200).json({ events: doctor.events });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to get event list: " + error.message });
  }
};

// Delete an event from the list
const deleteEvent = async (req, res) => {
  const userId = req.userId;
  const { event } = req.body;
  console.log("event", event);
  console.log("id", userId);

  try {
    const doctor = await DoctorProfile.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Filter out the event from doctor.events based on start and end properties
    doctor.events = doctor.events.filter(
      (e) =>
        e.start.getTime() !== new Date(event.start).getTime() &&
        e.end.getTime() !== new Date(event.end).getTime()
    );

    await doctor.save();

    return res.status(200).json(event);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete event: " + error.message });
  }
};

module.exports = {
  addEvent,
  getEventList,
  deleteEvent,
};
