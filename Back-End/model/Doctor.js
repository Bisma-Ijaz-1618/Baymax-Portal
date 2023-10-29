const mongoose = require("mongoose");

const DoctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  education: [
    {
      date: Date,
      qualification: String,
      institute: String,
    },
  ],
  phoneNumber: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O", "None"],
    default: "None", // You can set the default gender as per your requirement
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
