const DoctorProfile = require("../model/Doctor");
const createNewDoctor = require("./authController").handleNewUser;

const getAllDoctorProfiles = async (req, res) => {
  try {
    const DoctorProfiles = await DoctorProfile.find({
      isDeleted: false,
    }).populate("userId");
    if (!DoctorProfiles) {
      return res.status(204).json({ message: "No Doctor profiles found" });
    }
    console.log("Doctor profiles::", DoctorProfiles);
    return res.json(DoctorProfiles);
  } catch (error) {
    console.error("Error fetching Doctor profiles:", error);
    return res.status(500).json({ error: "Failed to fetch Doctor profiles" });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const foundDoctor = await DoctorProfile.findById(profileId).populate(
      "userId"
    );
    if (!foundDoctor) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(foundDoctor);
  } catch (err) {
    console.error("Error occurred while fetching Doctor data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateDoctorProfile = async (req, res) => {
  const DoctorProfileId = req.params.id;
  const updateData = req.body.formData;
  try {
    const updatedDoctorProfile = await DoctorProfile.findByIdAndUpdate(
      DoctorProfileId,
      updateData,
      { new: true }
    );
    console.log("updated?", updatedDoctorProfile);
    if (updatedDoctorProfile) {
      return res.status(200).json(updatedDoctorProfile);
    } else {
      return res
        .status(404)
        .json({ message: `No Doctor profile matches ID ${DoctorProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating Doctor profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDoctorProfile = async (req, res) => {
  const DoctorProfileId = req.params.id;

  try {
    const deletedDoctorProfile = await DoctorProfile.findByIdAndDelete(
      DoctorProfileId
    );

    if (deletedDoctorProfile) {
      return res.status(200).json({ message: "Doctor profile deleted" });
    } else {
      return res
        .status(404)
        .json({ message: `No Doctor profile matches ID ${DoctorProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while deleting Doctor profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addEvent = async (req, res) => {
  const { userId } = req.params;
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
  const { userId } = req.params;
  console.log("req.userid", req.userId);

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
  const { userId } = req.params;
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
  getAllDoctorProfiles,
  updateDoctorProfile,
  deleteDoctorProfile,
  createNewDoctor,
  getDoctorProfile,
  addEvent,
  getEventList,
  deleteEvent,
};
