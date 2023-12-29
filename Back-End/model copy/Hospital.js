const mongoose = require("mongoose");

const HospitalProfileSchema = new mongoose.Schema({
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
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  regNumber: {
    type: Number,
    required: true,
    default: null,
  },
  contactNumber: {
    type: Number,
    default: null,
  },
  doctorsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
  ],
  patientList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("HospitalProfile", HospitalProfileSchema);
