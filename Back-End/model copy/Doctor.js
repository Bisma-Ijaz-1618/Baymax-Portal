const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming there's a User model for the userId reference
    },
    doctorId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    licenseNumber: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    cnicNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    chatList: {
      type: [String],
      default: [],
    },
    appointmentList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Appointment",
      default: [],
    },
    paymentList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Payment",
      default: [],
    },
    addedPatients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Patient",
      default: [],
    },
    selectedHospitalList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Hospital", // Assuming there's a Hospital model for the hospitalId reference
      default: [],
    },
    selectedPatientList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Patient", // Assuming there's a Patient model for the patientId reference
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
