require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chat'); // Import chat routes

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' } // Adjust as needed for security
});

app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes); // Add chat routes

// Socket.io connection for real-time chat
io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('sendMessage', ({ room, sender, recipient, message }) => {
        io.to(room).emit('receiveMessage', { sender, message });
    });

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
