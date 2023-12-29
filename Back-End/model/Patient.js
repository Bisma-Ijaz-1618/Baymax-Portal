const mongoose = require("mongoose");

const PatientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  address: {
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "None",
    },
  },
  contactNumber: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  cnicNumber: {
    type: Number,
    required: true,
    default: null,
  },
  eContactNumber: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: "None", // You can set the default gender as per your requirement
  },
  bloodGroup: {
    type: String,
    default: "null",
  },
  DOB: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("PatientProfile", PatientProfileSchema);
