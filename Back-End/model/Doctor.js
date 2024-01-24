const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming there's a User model for the userId reference
    },
    isDeleted: {
      type: Boolean,
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
    licenseNumber: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    cnicNumber: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    yearsOfExperience: {
      type: Number,
      default: null,
    },
    DOB: {
      type: Date,
      default: null,
    },
    chatList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Chat", // Assuming there's a Chat model for the chatId reference
      default: [],
    },
    appointmentList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Appointment",
      default: [],
    },
    invoiceList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Invoice", // Assuming there's an Invoice model for the invoiceId reference
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
