const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BRRecordSchema = new Schema(
  {
    BRReadingId: { type: String, required: true },
    breathsPerMinute: { type: [Number], required: true },
    timeStamp: { type: [Date], required: true },
    connectionStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BRRecord", BRRecordSchema);
