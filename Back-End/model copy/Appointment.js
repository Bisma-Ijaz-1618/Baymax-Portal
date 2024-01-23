const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    appointmentId: {
      type: String,
      required: true,
    },
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice", // Assuming there's an Invoice model for the invoiceId reference
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Assuming there's a Doctor model for the doctorId reference
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Assuming there's a Patient model for the patientId reference
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    timeStamp: { type: [Date], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
