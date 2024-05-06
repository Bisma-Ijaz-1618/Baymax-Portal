const Appointment = require("../model/Appointment");
const Doctor = require("../model/Doctor");
const User = require("../model/Doctor");
const Patient = require("../model/Patient");
const mongoose = require("mongoose");
// Create a new appointment
const createAppointment = async (req, res) => {
  //takes doctors userID
  const { doctorId, date, startTime, status } = req.body;
  const patientId = req.userId;
  console.log("req.body", req.body);

  try {
    // Check if appointment already exists with the same startTime and doctorId
    const existingAppointment = await Appointment.findOne({
      doctorId: doctorId,
      startTime: new Date(date).setHours(startTime, 0, 0, 0),
    });

    if (existingAppointment) {
      // Appointment already exists, send response
      return res.status(409).json({ message: "Appointment already exists" });
    }
    // Create new appointment
    console.log("start time", startTime);
    console.log("created with", doctorId, patientId);
    const endTime = startTime + 1;
    const appointment = new Appointment({
      doctorId: doctorId,
      patientId: patientId,
      startTime: new Date(date).setHours(startTime, 0, 0, 0),
      endTime: new Date(date).setHours(endTime, 0, 0, 0),
      status: status,
    });
    const newAppointment = await appointment.save();
    console.log("obj created", newAppointment);

    const docProfile = await Doctor.findOne({ userId: doctorId });
    console.log("found doctor", docProfile);
    console.log("docevents", docProfile.events);
    const updatedEvents = docProfile?.events?.filter((event) => {
      // Check if the condition is true for the event
      console.log("event.start", event.start);
      console.log(
        "new Date(date).setHours(startTime);",
        new Date(date).setHours(startTime)
      );
      // Convert event.start to a timestamp for comparison
      const eventTimestamp = new Date(event.start).getTime();
      console.log("eventTimestamp", eventTimestamp);
      // Compare timestamps instead of date strings
      return eventTimestamp !== new Date(date).setHours(startTime);
    });
    console.log("updated events", updatedEvents);
    // Update the doctor's events array
    docProfile.events = updatedEvents;
    await docProfile.save();

    return res.status(200).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("error in create appointment", error);
  }
};

//Get appointments by Id
const getAppointmentsByUserId = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const appointments = await Appointment.find({
      $or: [{ doctorId: userId }, { patientId: userId }],
    })
      .populate("doctorId", "username") // Populate doctorId with username
      .populate("patientId", "username") // Populate patientId with username
      .exec();
    console.log("thse were found", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllAppointmentsDoctor = async (req, res) => {
  const userId = req.userId;

  try {
    const appointments = await Appointment.find({ doctorId: userId })
      .populate({
        path: "doctorId patientId",
        select: "username _id profileId profilePicture", // Select the fields from the referenced documents
      })
      .select("status startTime endTime _id doctorId patientId");

    console.log("sending these appointments", appointments);
    return res.status(200).json(appointments);
  } catch (error) {
    console.log("errrrrrrrrrrr", error);
    res.status(500).json({ message: error.message });
  }
};

// Get appointments by status
const getAppointmentsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const appointments = await Appointment.find({ status });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an appointment by appointmentId
const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.remove();
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    console.log("IN UPDATE APP", appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAppointmentsByUserId,
  getAllAppointmentsDoctor,
  getAppointmentsByStatus,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
