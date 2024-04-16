const Appointment = require("../model/Appointment");
const Doctor = require("../model/Doctor");
const mongoose = require("mongoose");
// Create a new appointment
const createAppointment = async (req, res) => {
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

    // Find the doctor
    const doctor = await Doctor.findOne({ userId: doctorId });

    // Filter out the conflicting event and split it into two parts
    const updatedEvents = doctor.events.reduce((acc, event) => {
      if (
        event.start < newAppointment.endTime &&
        event.end > newAppointment.startTime
      ) {
        if (event.start < newAppointment.startTime) {
          acc.push({ start: event.start, end: newAppointment.startTime });
        }
        if (event.end > newAppointment.endTime) {
          acc.push({ start: newAppointment.endTime, end: event.end });
        }
      } else {
        acc.push(event);
      }
      return acc;
    }, []);
    console.log("updated events", updatedEvents);
    // Update the doctor's events array
    doctor.events = updatedEvents;

    // Save the updated doctor
    await doctor.save();

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
  const { userId } = req.params;
  try {
    const appointments = await Appointment.find({
      $or: [{ patientId: userId }, { doctorId: userId }],
    });
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
        select: "username _id profileId", // Select the fields from the referenced documents
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

module.exports = {
  getAppointmentsByUserId,
  getAllAppointmentsDoctor,
  getAppointmentsByStatus,
  createAppointment,
  deleteAppointment,
};
