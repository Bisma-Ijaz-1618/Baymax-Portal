const mongoose = require("mongoose");

const DoctorProfileSchema = new mongoose.Schema({
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
  licenseNumber: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  yearsOfExperience: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: "None", // You can set the default gender as per your requirement
  },
  cnicNumber: {
    type: Number,
    default: null,
  },
  contactNumber: {
    type: Number,
    default: null,
  },
  hispitalAffiliation: {
    type: String,
    default: "None", // You can set the default gender as per your requirement
  },
  graduationDate: {
    type: Date,
    default: null,
  },
  department: {
    type: String,
    enum: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Gastroenterology",
      "Ophthalmology",
      "Dermatology",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Radiology",
      "Emergency Medicine",
      "Surgery",
      "Internal Medicine",
      "Oncology",
      "Urology",
      "ENT (Ear, Nose, and Throat)",
      "None",
    ],
    default: "None",
  },
  education: [
    {
      date: Date,
      qualification: String,
      institute: String,
    },
  ],
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  workLocations: { type: String, default: null },
  timetable: {
    type: Map,
    of: [String],
  },
});

const DoctorProfile = mongoose.model("DoctorProfile", DoctorProfileSchema);

module.exports = DoctorProfile;
