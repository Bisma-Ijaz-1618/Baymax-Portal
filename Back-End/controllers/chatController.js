const Chat = require("../model/Chat");

const getChat = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  console.log("here with", senderId, receiverId);
  const result = await Chat.deleteMany();

  if (result.ok === 1) {
    console.log("Deletion successful");
    console.log(`${result.deletedCount} documents deleted`);
  } else {
    console.log("Deletion failed");
  }
  try {
    const chat = await Chat.findOne({
      $or: [
        { Peer1Id: senderId, Peer2Id: receiverId },
        { Peer1Id: receiverId, Peer2Id: senderId },
      ],
    }).populate("messages");

    if (!chat) {
      chat = await Chat.create({
        Peer1Id: senderId,
        Peer2Id: receiverId,
        messages: [],
      });
      console.log("chat created");
    }

    return res.status(200).json(chat.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const saveChat = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  console.log("here with", senderId, receiverId);

  const { messages } = req.body;
  console.log("ehem", senderId, receiverId, messages);
  try {
    // Find the chat document by sender and receiver IDs
    const chat = await Chat.findOne({
      $or: [
        { Peer1Id: senderId, Peer2Id: receiverId },
        { Peer1Id: receiverId, Peer2Id: senderId },
      ],
    }).populate("messages");

    if (!chat) {
      // If the chat doesn't exist, create a new one
      chat = await Chat.create({
        senderId: senderId,
        receiverId: receiverId,
        messages: [],
      });
    }
    if (chat.Peer1Id === senderId) {
      console.log("peer1 is sender");
      // Assuming you have an array of MessageTypeSchema objects called 'messages'
      const updatedMessages = messages.map((message) => ({
        ...message,
        msgType: "Peer1",
      }));

      console.log(updatedMessages);
    } else {
      console.log("peer2 is sender");
      // Assuming you have an array of MessageTypeSchema objects called 'messages'
      const updatedMessages = messages.map((message) => ({
        ...message,
        msgType: "Peer2",
      }));

      console.log(updatedMessages);
    }

    // Append new messages to the chat
    await chat.save();

    return res.status(200).json({ message: "Messages appended successfully" });
  } catch (error) {
    console.error("Error appending messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getChat,
  saveChat,
};
