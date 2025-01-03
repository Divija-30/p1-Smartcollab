const Document = require('../models/Document');

// Create a new document
exports.createDocument = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newDocument = new Document({ title, content, owner: req.userId });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get all documents for a user
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.userId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Edit an existing document
exports.editDocument = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const document = await Document.findById(id);
    if (!document) return res.status(404).json({ msg: "Document not found" });

    if (document.owner.toString() !== req.userId) {
      return res.status(403).json({ msg: "You are not authorized to edit this document" });
    }

    document.title = title || document.title;
    document.content = content || document.content;
    await document.save();

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
