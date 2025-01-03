import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Check if username is already saved in localStorage
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      // Prompt user to enter their name
      const enteredUsername = prompt('Please enter your name:');
      if (enteredUsername) {
        setUsername(enteredUsername);
        localStorage.setItem('chatUsername', enteredUsername);
      }
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chat/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message }),
      });

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat">
      <h3>Chat</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
