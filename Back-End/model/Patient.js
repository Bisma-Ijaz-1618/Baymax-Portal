const mongoose = require("mongoose");

const PatientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  weight: {
    value: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      enum: ["kg", "None"],
      default: "None",
    },
  },
  age: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "None"],
    default: "None",
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O", "None"],
    default: "None", // You can set the default gender as per your requirement
  },
  appointments: [
    {
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorProfile",
      },
      appointmentTime: {
        type: Date,
        default: Date.now,
      },
      appointmentContext: {
        type: String,
        default: "",
      },
    },
  ],

  payments: [
    {
      appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
      amount: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
    },
  ],
});

const PatientProfile = mongoose.model("PatientProfile", PatientProfileSchema);

module.exports = PatientProfile;
