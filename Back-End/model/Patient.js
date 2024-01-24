const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
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
    eContactNumber: {
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
    bloodGroup: {
      type: String,
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
      ref: "Appointment", // Assuming there's an Appointment model for the appointmentId reference
      default: [],
    },
    kitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kit", // Assuming there's a Kit model for the kitId reference
      default: null,
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
