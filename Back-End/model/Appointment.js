const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appointmentStatusEnum = [
  "urgent",
  "latest",
  "completed",
  "pending",
  "regular",
  "accepted",
  "requested",
];

const AppointmentSchema = new Schema(
  {
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice", // Assuming there's an Invoice model for the invoiceId reference
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Assuming there's a Doctor model for the doctorId reference
      default: null,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Assuming there's a Patient model for the patientId reference
      default: null,
    },
    status: {
      type: String,
      default: null,
      enum: appointmentStatusEnum,
    },
    details: {
      type: String,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          // Ensure endTime is after startTime
          return this.startTime < value;
        },
        message: "End time must be after start time",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);