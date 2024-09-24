import { Server } from "socket.io";
import Message from '../models/message.js';
import Room from '../models/room.js';

const initializeSocket = (server) => {
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
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

export default initializeSocket;
