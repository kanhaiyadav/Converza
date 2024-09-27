import { Server } from "socket.io";
import Message from '../models/message.js';
import Room from '../models/room.js';
import Contact from '../models/contact.js';

const initializeSocket = (server) => {

    // const userActiveRooms = {};    

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
            const room = await Room.findById(data.room)?.populate('messages');
            const messages = room.messages;
            if (room.unreadMessagesSender !== data.userId) {
                room.unreadMessagesCount = 0;
                await room.save();
            }
            callback(null, messages);
            console.log(`User joined room: ${data.room}`);
        });
        socket.on('bulkJoin', async (data, callback) => {
            socket.join(data.room);
            const room = await Room.findById(data.room)?.populate('messages');
            callback(null, {});
            console.log(`bulk join: ${data.room}`);
        });

        socket.on('message', async (data, callback) => {
            console.log(data.content);
            const message = await Message.create({
                content: data.content,
                sender: data.sender,
                room: data.room,
            });
            callback(null, { status: 'ok' });
            io.to(data.room).emit(`messageSent`, {
                message,
                roomId: data.room,
                contactId: data.contact,
            });
            const room = await Room.findById(data.room);
            room.messages.push(message._id);
            room.lastMessage = message._id;
            await room.save();
        });
        socket.on('unreadMessage', async (data) => {
            const room = await Room.findById(data.roomId);
            room.unreadMessagesCount += 1;
            room.unreadMessagesSender = data.sender;
            await room.save();
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // delete userActiveRooms[socket.id];  // Remove from active room tracking
        });
    });

    return io;
};

export default initializeSocket;
