const mongoose = require("mongoose");

const HospitalProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: null,
    default: false,
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
  contactNumber: {
    type: Number,
    default: null,
  },
  regNumber: {
    type: Number,
    default: null,
    default: null,
  },
  doctorsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Doctor",
    },
  ],
  patientList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("HospitalProfile", HospitalProfileSchema);
