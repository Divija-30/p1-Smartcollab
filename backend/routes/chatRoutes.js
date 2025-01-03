const express = require('express');
const router = express.Router();

// MongoDB Model for Chat Message
const Message = require('../models/Message');

// Get all chat messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Post a new chat message
router.post('/message', async (req, res) => {
  const { username, message } = req.body;

  try {
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
