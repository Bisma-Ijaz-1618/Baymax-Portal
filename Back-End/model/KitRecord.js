const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitRecordSchema = new Schema(
  {
    recordId: { type: String, required: true },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    kitId: { type: Number, required: true },
    date: { type: Date, required: true },
    totalTime: { type: String, required: true },
    connectionStatus: { type: String, required: true },
    BPReadingsIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "BPReading",
      default: [],
    },
    HRReadingsIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "HRReading",
      default: [],
    },
    SPO2ReadingsIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SPO2Reading",
      default: [],
    },
    BRReadingsIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "BRReading",
      default: [],
    },
    ModelPrediction: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KitRecord", KitRecordSchema);
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const KitRecordSchema = new Schema(
//   {
//     recordId: { type: String, required: true },
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },
//     kitId: { type: Number, required: true },
//     date: { type: Date, required: true },
//     totalTime: { type: String, required: true },
//     connectionStatus: { type: String, required: true },
//     BPReadingsIds: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "BPReading",
//       default: [],
//     },
//     HRReadingsIds: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "HRReading",
//       default: [],
//     },
//     SPO2ReadingsIds: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "SPO2Reading",
//       default: [],
//     },
//     BRReadingsIds: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "BRReading",
//       default: [],
//     },
//     ModelPrediction: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("KitRecord", KitRecordSchema);
