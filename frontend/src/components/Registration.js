import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';  // Import from utils/auth.js
import '../components/styles/Registration.css';  // Import Registration.css

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (response.status === 201) {
        // Store the token in localStorage
        setToken(data.token); // Store the token after successful registration
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error processing your request. Please try again.');
    }
  };

  return (
    <div className="registration-page"> {/* Add the wrapper div with the correct class */}
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="registration-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registration-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registration-input"
        />
        <button type="submit" className="registration-btn">Register</button>
      </form>
    </div>
  );
};

export default Registration;
