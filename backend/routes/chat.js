// routes/chat.js
const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// Route to get all chat messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 }); // Sort messages by timestamp
    res.json(messages);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching messages' });
  }
});

// Route to send a new message
router.post('/message', async (req, res) => {
  const { username, message } = req.body;
  try {
    const newMessage = new Chat({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ msg: 'Error sending message' });
  }
});

module.exports = router;
