import { Server } from "socket.io";
import Message from '../models/message.js';
import Room from '../models/room.js';

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
            console.log(`User joined room: ${data.room}`);
            const room = await Room.findById(data.room)?.populate('readMessages').populate('unreadMessages');
            const messages = room.readMessages;
            const unreadMessages = room.unreadMessages;
            if (room.unreadMessagesSender !== data.userId) {
                room.unreadMessagesCount = 0;
                await room.save();
            }
            callback(null, {
                readMessages: messages,
                unreadMessages: unreadMessages,
            });
            console.log(`User joined room: ${data.room}`);
        });
        socket.on('bulkJoin', async (data, callback) => {
            socket.join(data.room);
            const room = await Room.findById(data.room)?.populate('readMessages');
            console.log("Bulk joined the room: ", data.room);
            callback(null, {});
            // console.log(`bulk join: ${data.room}`);
        });

        socket.on('message', async (data, callback) => {
            console.log(data.content);
            const message = await Message.create({
                content: data.content,
                sender: data.sender,
                room: data.room,
            });
            callback(null, { status: 'ok' });
            const roomDetails = io.sockets.adapter.rooms.get(data.room);
            const room = await Room.findById(data.room);
            if (roomDetails.size === 1) {
                console.log(room.unreadMessagesCount);
                console.log('Room has only one member');
                room.unreadMessagesCount += 1;
                room.unreadMessagesSender = data.sender;
                await room.save();
                console.log(room.unreadMessagesCount);
            }
            io.to(data.room).emit(`messageSent`, {
                message,
                roomId: data.room,
                contactId: data.contact,
            });
            room.readMessages.push(message._id);
            room.readMessagesCount += 1;
            room.lastMessage = message._id;
            await room.save();
        });
        socket.on('unreadMessage', async (data) => {
            const room = await Room.findById(data.roomId);
            room.unreadMessagesCount += 1;
            room.unreadMessages.push(data.messageId);
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
