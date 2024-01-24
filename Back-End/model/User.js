const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    backgroundPicture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
      Doctor: Number,
      Patient: Number,
      Hospital: Number,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "rolesRef",
    },
    rolesRef: {
      type: String,
      enum: ["Admin", "Doctor", "Patient", "Hospital"],
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
