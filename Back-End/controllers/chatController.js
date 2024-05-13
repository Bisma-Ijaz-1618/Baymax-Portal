const Chat = require("../model/Chat");

const getChat = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  console.log("here to get", senderId, receiverId);

  try {
    let chat = await Chat.findOne({
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
      console.log("chat created", chat);
    }
    console.log("returning chat", chat);
    return res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const saveChat = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  console.log("here to save", senderId, receiverId);

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
    let updatedMessages = [];
    if (chat.Peer1Id === senderId) {
      console.log("peer1 is sender");
      // Assuming you have an array of MessageTypeSchema objects called 'messages'
      updatedMessages = messages.map((message) => ({
        ...message,
        msgType: "Peer1",
      }));

      console.log(updatedMessages);
    } else {
      console.log("peer2 is sender");
      // Assuming you have an array of MessageTypeSchema objects called 'messages'
      updatedMessages = messages.map((message) => ({
        ...message,
        msgType: "Peer2",
      }));

      console.log(updatedMessages);
    }
    chat.messages.push(...updatedMessages);
    console.log("updated chat is", chat);
    // Append new messages to the chat
    await chat.save();
    console.log("updated chat is", chat);

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
