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

const createDoctorProfile = async (req, res) => {
  // const { weight, age, height } = req.body;
  // try {
  //   const newDoctorProfile = new DoctorProfile({
  //     weight,
  //     age,
  //     height,
  //     bloodGroup,
  //     appointments,
  //     payments,
  //   });
  //   const savedDoctorProfile = await newDoctorProfile.save();
  //   return res.status(200).json(savedDoctorProfile);
  // } catch (error) {
  //   console.error("Error creating Doctor profile:", error);
  //   return res.status(500).json({ error: "Failed to create Doctor profile" });
  // }
};
module.exports = {
  getAllDoctorProfiles,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
  createNewDoctor,
  getDoctorProfile,
};
