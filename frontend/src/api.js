import axios from 'axios';

// Base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Retrieve the token from localStorage
const getToken = () => localStorage.getItem('token');

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    return response.data; // Return the token or user data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

// Register function
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Registration failed');
  }
};

// Fetch chat messages
export const fetchChats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chats`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Add token to headers
      },
    });
    return response.data; // Return chat history
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch chats');
  }
};

// Post a new chat message
export const postChat = async (message) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/chats`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add token to headers
        },
      }
    );
    return response.data; // Return the saved message
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to post chat');
  }
};

// Fetch all documents for the authenticated user
export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/documents`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Add token to headers
      },
    });
    return response.data; // Return the list of documents
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch documents');
  }
};

// Create a new document
export const createDocument = async (title, content) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/documents`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add token to headers
        },
      }
    );
    return response.data; // Return the created document
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to create document');
  }
};

// Update an existing document by ID
export const updateDocument = async (id, title, content) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/documents/${id}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add token to headers
        },
      }
    );
    return response.data; // Return the updated document
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update document');
  }
};

// Delete a document by ID
export const deleteDocument = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Add token to headers
      },
    });
    return response.data; // Return the result of the deletion
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete document');
  }
};
