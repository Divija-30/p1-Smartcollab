import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make API requests

const EditDocument = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentId || !documentContent) {
      setErrorMessage('Both Document ID and content are required.');
      return;
    }

    try {
      // Send the updated document data to the backend API
      const response = await axios.put(
        `http://localhost:5000/api/documents/${documentId}`, 
        { content: documentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token to header for authorization
          }
        }
      );
      
      // If successful, clear the form and display success message
      setSuccessMessage('Document updated successfully!');
      setErrorMessage('');
      setDocumentContent(''); // Clear content field after success
    } catch (error) {
      console.error('Error updating document:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update document');
      setSuccessMessage('');
    }
  };

  return (
    <div className="edit-document">
      <h3>Edit Document</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        />
        <textarea
          placeholder="New Content"
          value={documentContent}
          onChange={(e) => setDocumentContent(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>

      {/* Display error message if any */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Display success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default EditDocument;
