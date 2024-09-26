import { Server } from "socket.io";
import Message from '../models/message.js';
import Room from '../models/room.js';

const initializeSocket = (server) => {

    const userActiveRooms = {};    
    
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join', async (data, callback) => {
            socket.join(data.room);
            userActiveRooms[socket.id] = data.room;
            console.log(userActiveRooms);
            const room = await Room.findById(data.room).populate('messages');
            const messages = room.messages;
            callback(null, messages);
            console.log(`User joined room: ${data.room}`);
        });

        socket.on('message', async (data, callback) => {
            console.log(data.content);
            const message = await Message.create({
                content: data.content,
                sender: data.sender,
                room: data.room,
            });
            callback(null, {status: 'ok'});
            io.to(data.room).emit(`messageSent-${data.room}`, message);
            const room = await Room.findById(data.room);
            room.messages.push(message._id);
            room.lastMessage = message._id;
            await room.save();

            // Notify other users in the room, excluding the sender
            const usersInRoom = Array.from(io.sockets.adapter.rooms.get(data.room) || []);
            console.log(userActiveRooms);
            console.log("Here is all the users in the room",usersInRoom, socket.id);
            usersInRoom.forEach(async userSocketId => {
                if (userSocketId !== socket.id && userActiveRooms[userSocketId] !== data.room) {
                    // Increment unread messages for the inactive user
                    console.log("User is not in the room");
                    socket.to(userSocketId).emit('unreadMessage', {
                        contactId: data.contact,
                    });
                    const room = await Room.findById(data.room);
                    room.unreadMessages.push(message._id);
                    room.unreadMessagesCount += 1;
                    await room.save(); 
                }
            });
        });

        // Track when user leaves or disconnects
        socket.on('leave', (data) => {
            socket.leave(data.room);
            userActiveRooms[socket.id] = null;  // User left the room, so no active room
            console.log(`User left room: ${data.room}`);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            delete userActiveRooms[socket.id];  // Remove from active room tracking
        });
    });

    return io;
};

export default initializeSocket;
