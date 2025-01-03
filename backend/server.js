const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); // For creating the server
const { Server } = require('socket.io'); // For real-time communication
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app); // Attach HTTP server to Express
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (adjust this for production)
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes); // Ensure document routes are used here
app.use('/api/chat', chatRoutes);

// Socket.io functionality
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Chat event
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);
    io.emit('receiveMessage', data); // Broadcast message to all connected clients
  });

  // Document collaboration event
  socket.on('editDocument', (data) => {
    console.log('Document edit received:', data);
    socket.broadcast.emit('updateDocument', data); // Notify all other clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
