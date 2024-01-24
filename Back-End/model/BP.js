const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BPRecordSchema = new Schema(
  {
    BPReadingId: { type: String, required: true },
    systolicPressure: { type: [Number], required: true },
    diastolicPressure: { type: [Number], required: true },
    timeStamp: { type: [Date], required: true },
    connectionStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BPRecord", BPRecordSchema);
