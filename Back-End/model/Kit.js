const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Kit = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    registerationDate: { type: Date, required: false },
    connectionStatus: { type: Boolean, required: false },
    Records: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Record",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kit", Kit);
