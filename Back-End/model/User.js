const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const referencesIntegrityChecker = require("mongoose-references-integrity-checker");

const UserSchema = new Schema( //remove posts
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
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
      Doctor: Number,
      Patient: Number,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
    ],
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
