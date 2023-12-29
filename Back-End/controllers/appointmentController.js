const AppointmentProfile = require("../model/Appointment");
const createNewAppointment = require("./authController").handleNewUser;

const getAllAppointmentProfiles = async (req, res) => {
  try {
    const adminProfiles = await AppointmentProfile.find({
      isDeleted: false,
    }).populate("userId");
    if (!adminProfiles) {
      return res.status(204).json({ message: "No admin profiles found" });
    }
    return res.json(adminProfiles);
  } catch (error) {
    console.error("Error fetching admin profiles:", error);
    return res.status(500).json({ error: "Failed to fetch admin profiles" });
  }
};

const createAppointmentProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const newAppointmentProfile = new AppointmentProfile({
      userId,
    });

    const savedAppointmentProfile = await newAppointmentProfile.save();
    return res.status(200).json(savedAppointmentProfile);
  } catch (error) {
    console.error("Error creating admin profile:", error);
    return res.status(500).json({ error: "Failed to create admin profile" });
  }
};

const updateAppointmentProfile = async (req, res) => {
  const adminProfileId = req.params.id;
  const updateData = req.body;

  try {
    const updatedAppointmentProfile =
      await AppointmentProfile.findByIdAndUpdate(adminProfileId, updateData, {
        new: true,
      });

    if (updatedAppointmentProfile) {
      return res.status(200).json(updatedAppointmentProfile);
    } else {
      return res
        .status(404)
        .json({ message: `No admin profile matches ID ${adminProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating admin profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAppointmentProfile = async (req, res) => {
  const adminProfileId = req.params.id;

  try {
    const deletedAppointmentProfile =
      await AppointmentProfile.findByIdAndDelete(adminProfileId);

    if (deletedAppointmentProfile) {
      return res.status(200).json({ message: "Appointment profile deleted" });
    } else {
      return res
        .status(404)
        .json({ message: `No admin profile matches ID ${adminProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while deleting admin profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllAppointmentProfiles,
  createAppointmentProfile,
  updateAppointmentProfile,
  deleteAppointmentProfile,
  createNewAppointment,
};
