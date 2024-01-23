const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming there's a User model for the userId reference
    },
    patientId: {
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
    emergencyContactNumber: {
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
    bloodGroup: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    chatList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Chat", // Assuming there's a Chat model for the chatId reference
      default: [],
    },
    appointmentList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Appointment", // Assuming there's an Appointment model for the appointmentId reference
      default: [],
    },
    kitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kit", // Assuming there's a Kit model for the kitId reference
      required: true,
    },
    invoiceList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Invoice", // Assuming there's an Invoice model for the invoiceId reference
      default: [],
    },
    addedDoctorsList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Doctor", // Assuming there's a Doctor model for the doctorId reference
      default: [],
    },
    selectedDoctorList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Doctor",
      default: [],
    },
    selectedHospitalList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Hospital",
      default: [],
    },
    recordList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Record",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
