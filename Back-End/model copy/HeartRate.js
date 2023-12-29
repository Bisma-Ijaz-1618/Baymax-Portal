const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HRRecordSchema = new Schema(
  {
    HRReadingId: { type: String, required: true },
    beatsPerMinute: { type: [Number], required: true },
    timeStamp: { type: [Date], required: true },
    connectionStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HRRecord", HRRecordSchema);
