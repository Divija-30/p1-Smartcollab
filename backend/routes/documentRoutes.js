const express = require('express');
const router = express.Router();
const Document = require('../models/Document'); // Mongoose model for documents
const { authenticateUser } = require('../middlewares/authMiddleware'); // Import authenticateUser middleware

// Create a new document
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if title or content is missing or invalid
    if (!title || !content || title.length < 3 || content.length < 5) {
      return res.status(400).json({ message: 'Title (min 3 chars) and content (min 5 chars) are required' });
    }

    const newDocument = new Document({
      title,
      content,
      userId: req.user.id, // Associate the document with the authenticated user
    });
    
    await newDocument.save();
    res.status(201).json(newDocument); // Return created document
  } catch (error) {
    console.error('Error creating document:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Fetch all documents for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id }); // Get documents for the authenticated user
    res.status(200).json(documents); // Return documents
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Fetch a specific document by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document); // Return document
  } catch (error) {
    console.error('Error fetching document:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Update a document by ID
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if title or content is missing or invalid
    if (!title || !content || title.length < 3 || content.length < 5) {
      return res.status(400).json({ message: 'Title (min 3 chars) and content (min 5 chars) are required' });
    }

    const updatedDocument = await Document.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, content },
      { new: true } // Return the updated document
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(updatedDocument); // Return updated document
  } catch (error) {
    console.error('Error updating document:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Delete a document by ID
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const deletedDocument = await Document.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // Ensure the document belongs to the authenticated user
    });

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
