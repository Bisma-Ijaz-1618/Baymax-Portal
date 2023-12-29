const AdminProfile = require("../model/Admin");
const createNewAdmin = require("./authController").handleNewUser;

const getAllAdminProfiles = async (req, res) => {
  try {
    const adminProfiles = await AdminProfile.find({
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

const createAdminProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const newAdminProfile = new AdminProfile({
      userId,
    });

    const savedAdminProfile = await newAdminProfile.save();
    return res.status(200).json(savedAdminProfile);
  } catch (error) {
    console.error("Error creating admin profile:", error);
    return res.status(500).json({ error: "Failed to create admin profile" });
  }
};

const updateAdminProfile = async (req, res) => {
  const adminProfileId = req.params.id;
  const updateData = req.body;

  try {
    const updatedAdminProfile = await AdminProfile.findByIdAndUpdate(
      adminProfileId,
      updateData,
      { new: true }
    );

    if (updatedAdminProfile) {
      return res.status(200).json(updatedAdminProfile);
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

const deleteAdminProfile = async (req, res) => {
  const adminProfileId = req.params.id;

  try {
    const deletedAdminProfile = await AdminProfile.findByIdAndDelete(
      adminProfileId
    );

    if (deletedAdminProfile) {
      return res.status(200).json({ message: "Admin profile deleted" });
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
  getAllAdminProfiles,
  createAdminProfile,
  updateAdminProfile,
  deleteAdminProfile,
  createNewAdmin,
};
