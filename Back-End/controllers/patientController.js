const PatientProfile = require("../model/Patient");
const createNewPatient = require("./authController").handleNewUser;
const fs = require("fs").promises;
const path = require("path");
const getAllPatientProfiles = async (req, res) => {
  try {
    const patientProfiles = await PatientProfile.find({
      isDeleted: false,
    }).populate("userId");
    if (!patientProfiles) {
      return res.status(204).json({ message: "No patient profiles found" });
    }
    console.log("patient profiles::", patientProfiles);
    return res.json(patientProfiles);
  } catch (error) {
    console.error("Error fetching patient profiles:", error);
    return res.status(500).json({ error: "Failed to fetch patient profiles" });
  }
};

const getPatientProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const foundPatient = await PatientProfile.findById(profileId).populate(
      "userId"
    );
    if (!foundPatient) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(foundPatient);
  } catch (err) {
    console.error("Error occurred while fetching Patient data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePatientProfile = async (req, res) => {
  const patientProfileId = req.params.id;
  const updateData = req.body.formData;
  try {
    const updatedPatientProfile = await PatientProfile.findByIdAndUpdate(
      patientProfileId,
      updateData,
      { new: true }
    );
    console.log("updated?", updatedPatientProfile);
    if (updatedPatientProfile) {
      return res.status(200).json(updatedPatientProfile);
    } else {
      return res
        .status(404)
        .json({ message: `No patient profile matches ID ${patientProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating patient profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePatientProfile = async (req, res) => {
  const patientProfileId = req.params.id;

  try {
    const deletedPatientProfile = await PatientProfile.findByIdAndDelete(
      patientProfileId
    );

    if (deletedPatientProfile) {
      return res.status(200).json({ message: "Patient profile deleted" });
    } else {
      return res
        .status(404)
        .json({ message: `No patient profile matches ID ${patientProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while deleting patient profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createPatientProfile = async (req, res) => {
  // const { weight, age, height, bloodGroup, appointments, payments } = req.body;
  // try {
  //   const newPatientProfile = new PatientProfile({
  //     weight,
  //     age,
  //     height,
  //     bloodGroup,
  //     appointments,
  //     payments,
  //   });
  //   const savedPatientProfile = await newPatientProfile.save();
  //   return res.status(200).json(savedPatientProfile);
  // } catch (error) {
  //   console.error("Error creating patient profile:", error);
  //   return res.status(500).json({ error: "Failed to create patient profile" });
  // }
};

const getProfilePicture = async (req, res) => {
  try {
    const imageName = req.userId;
    const imagePath = path.join("uploads", imageName);
    console.log("image path is", imagePath);
    const image = await fs.readFile(imagePath);

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(image, "binary");
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Internal server error");
  }
};

const getProfilePictureById = async (req, res) => {
  const { id } = req.params;
  try {
    const imageName = id;
    const imagePath = path.join("uploads", imageName);
    console.log("image path is", imagePath);
    const image = await fs.readFile(imagePath);

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(image, "binary");
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Internal server error");
  }
};
module.exports = {
  getAllPatientProfiles,
  createPatientProfile,
  updatePatientProfile,
  deletePatientProfile,
  createNewPatient,
  getPatientProfile,
  getProfilePicture,
  getProfilePictureById,
};
