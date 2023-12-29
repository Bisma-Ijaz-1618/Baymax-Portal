const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const AdminProfile = mongoose.model("AdminProfile", AdminProfileSchema);

module.exports = AdminProfile;
