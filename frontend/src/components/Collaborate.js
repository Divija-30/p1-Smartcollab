import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend server for Socket.IO

const Collaborate = () => {
  const [documentId, setDocumentId] = useState(''); // Document being edited
  const [content, setContent] = useState(''); // Document content
  const [documents, setDocuments] = useState([]); // List of available documents
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch available documents from the server
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/documents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure authorization
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();

    // Listen for updates from other collaborators
    socket.on('document-update', ({ id, updatedContent }) => {
      if (id === documentId) {
        setContent(updatedContent);
      }
    });

    // Cleanup socket event listener when component unmounts or documentId changes
    return () => socket.off('document-update');
  }, [documentId]);

  const handleSelectDocument = async (id) => {
    setDocumentId(id);
    setLoading(true); // Set loading state when fetching document content

    try {
      const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure authorization
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch document content');
      }

      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);

    // Emit the updated content to other collaborators
    socket.emit('update-document', { id: documentId, updatedContent });
  };

  return (
    <div className="collaborate">
      <h3>Collaborate</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <p>Select a document to collaborate on:</p>

      {loading ? (
        <p>Loading documents...</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id} onClick={() => handleSelectDocument(doc._id)}>
              {doc.title} {/* Assuming 'title' is the correct field name */}
            </li>
          ))}
        </ul>
      )}

      {documentId && (
        <div>
          <h4>Editing Document: {documentId}</h4>
          <textarea
            value={content}
            onChange={handleContentChange}
            rows="10"
            cols="50"
            disabled={loading} // Disable while loading
          />
        </div>
      )}
    </div>
  );
};

export default Collaborate;
