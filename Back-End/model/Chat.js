const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageTypeSchema = new Schema({
  msgType: {
    type: String,
    enum: ["Peer1", "Peer2"],
    required: true,
  },
  msgText: {
    type: String,
    required: true,
  },
});

const ChatSchema = new Schema({
  messages: [MessageTypeSchema],
  Peer1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Peer2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Chat", ChatSchema);
