const bcrypt = require("bcrypt");
const User = require("../model/User");
const AdminProfile = require("../model/Admin");
const DoctorProfile = require("../model/Doctor");
const PatientProfile = require("../model/Patient");
const extractDetails = (foundUser) => {
  const { password, followers, following, refreshToken, ...otherdetails } =
    foundUser._doc;
  return otherdetails;
};
const getData = (req, res) => {
  console.log("dataRecieved", req.body);

  if (req.body) {
    return res.sendStatus(200);
  } else return res.sendStatus(400);
};
const getAllUsers = async (req, res) => {
  console.log(req);
  console.log("response being sent", res.paginatedResults);
  return res.status(200).json({ results: res.paginatedResults });
};

const getAllActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.find({ isDeleted: false }).exec();
    return res.status(200).json(activeUsers);
  } catch (err) {
    console.error("Error occurred while fetching active users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createNewUser = require("./authController").handleNewUser;

const updateUser = async (req, res) => {
  console.log("updating", req.params.id, "fields", req.body);
  const userId = req.params.id;
  const updateData = req.body;
  const options = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      options
    );

    if (updatedUser) {
      const result = extractDetails(updatedUser);
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: `No user matches ID ${userId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("ID RECEIVED IN DEL", userId);
  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: `No user matches ID ${userId}` });
    }

    if (foundUser.isDeleted) {
      console.log(foundUser);
      return res.status(200).json({ message: "User already deleted" });
    } else {
      //const deletedData = await Promise.all()
      foundUser.isDeleted = true;
      const deletedUser = await foundUser.save();
      console.log("deleted", foundUser.isDeleted);
      const deletedData = await Promise.all([
        foundUser.save(),
        Comment.updateMany(
          { userId, isDeleted: false },
          { $set: { isDeleted: true } }
        ),
        Post.updateMany(
          { userId, isDeleted: false },
          { $set: { isDeleted: true } }
        ),
        AdminProfile.updateMany(
          { userId, isDeleted: false },
          { $set: { isDeleted: true } }
        ),
        PatientProfile.updateMany(
          { userId, isDeleted: false },
          { $set: { isDeleted: true } }
        ),
        DoctorProfile.updateMany(
          { userId, isDeleted: false },
          { $set: { isDeleted: true } }
        ),
      ]);
      const result = extractDetails(deletedUser);
      console.log("User deleted:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error occurred while deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
      return res.status(404).json({ message: "User not found" });
    }

    const result = extractDetails(foundUser);
    return res.json(result);
  } catch (err) {
    console.error("Error occurred while fetching user data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const followAUser = async (req, res) => {
  if (!req?.userId || !req?.body?.followId) {
    res.status(400).json({ message: "ids missing in body" });
  }
  const selfId = req.userId;
  const followId = req.body.followId;
  if (selfId === followId) {
    res.sendStatus(403); //action forbidden//cant follow self
  } else {
    try {
      const [selfUser, followUser] = await Promise.all([
        User.findOne({ _id: selfId, isDeleted: false }).exec(),
        User.findOne({ _id: followId, isDeleted: false }).exec(),
      ]);
      if (!followUser) {
        return res
          .status(404)
          .json({ message: `no user matches id ${followId}` });
      }

      if (!followUser.followers.includes(selfId)) {
        followUser.followers.push(selfId);
        selfUser.following.push(followId);

        const promise = await Promise.all([followUser.save(), selfUser.save()]);
        if (promise[0] && promise[1]) {
          return res.status(200).json({
            message: `followed`,
          });
        }
      } else {
        res.status(400).json({ message: "user already following" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const removeAFollower = async (req, res) => {
  //takes self id and id of user to be followed
  if (!req?.userId || !req?.body?.removeId) {
    res.status(400).json({ message: "ids missing in body" });
  }
  const selfId = req.userId;
  const removeId = req.body.removeId;
  if (selfId === removeId) {
    res.sendStatus(403); //action forbidden//cant follow self
  } else {
    try {
      const [selfUser, removeUser] = await Promise.all([
        User.findOne({ _id: selfId, isDeleted: false }).exec(),
        User.findOne({ _id: removeId, isDeleted: false }).exec(),
      ]);
      if (!removeUser) {
        return res
          .status(400)
          .json({ message: `no user matches id ${removeId}` });
      }
      if (selfUser.following.includes(removeId)) {
        selfUser.following.pull(removeId);
        removeUser.followers.pull(selfId);

        const promise = await Promise.all([removeUser.save(), selfUser.save()]);
        if (promise[0] && promise[1]) {
          res.status(200).json({ message: `removed` });
        }
      } else {
        res.status(400).json({ message: "user already removed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = {
  getAllUsers,
  getUserData,
  createNewUser,
  updateUser,
  deleteUser,
  followAUser,
  removeAFollower,
  getAllActiveUsers,
  getData,
};
