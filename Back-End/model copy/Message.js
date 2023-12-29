const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model for the senderId reference
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
