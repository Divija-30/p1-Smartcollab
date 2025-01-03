import React, { useState } from "react";
import "./styles/CreateDocument.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your backend server address

const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateDocument = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Document created successfully!");
        console.log("Document Created:", data);

        // Notify others about the new document via socket
        socket.emit("newDocument", data);
      } else {
        setMessage("Failed to create document.");
      }
    } catch (error) {
      console.error("Error creating document:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="create-document">
      <h2>Create a New Document</h2>
      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Document Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreateDocument}>Create</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateDocument;
