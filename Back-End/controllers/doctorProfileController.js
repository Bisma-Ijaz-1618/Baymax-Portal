const User = require("../model/User");
const fs = require("fs").promises;
const path = require("path");

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

const upadteProfilePicture = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have authentication middleware
    const imageUrl = req.file.path; // Path where the image is saved

    // Update the doctor's profile with the new image URL
    console.log("in image uplaoder with path..", imageUrl);
    await User.findByIdAndUpdate(userId, { profilePicture: imageUrl });

    res.status(200).send("Image uploaded successfully");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Internal server error");
  }
};
const getMyProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const foundDoctor = await User.findById(userId).populate("profileId");
    if (!foundDoctor) {
      return res.status(404).json({ message: "Could not fetch profile" });
    }
    return res.status(200).json(foundDoctor);
  } catch (err) {
    console.error("Error occurred while fetching Doctor data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMyProfile,
  upadteProfilePicture,
  getProfilePicture,
};
