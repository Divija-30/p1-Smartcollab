const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
  const { text } = req.body;
  const { userId } = req;

  try {
    const newMessage = new Message({ text, sender: userId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender", "username");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
