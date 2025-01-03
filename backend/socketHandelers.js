const handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
  
      // Chat functionality
      socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        io.emit('receiveMessage', data); // Broadcast message to all users
      });
  
      // Collaborative document editing
      socket.on('editDocument', (data) => {
        console.log('Document edit received:', data);
        socket.broadcast.emit('updateDocument', data); // Notify others
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });
  };
  
  module.exports = handleSocketConnection;
  