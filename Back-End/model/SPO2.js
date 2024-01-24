const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SPO2RecordSchema = new Schema(
  {
    SPO2ReadingId: { type: String, required: true },
    saturationPerMinute: { type: [Number], required: true },
    timeStamp: { type: [Date], required: true },
    connectionStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SPO2Record", SPO2RecordSchema);
