import { Server } from "socket.io";
import Message from "../Models/message.js";
import Room from '../Models/Room.js';
// import User from '../Models/user.js';
// import Contact from "../Models/contact.js";

const initializeSocket = (server) => {

    // const userActiveRooms = {};    

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    // const connectedUsers = {};


    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // socket.on('markOnline', async (data) => {
        //     connectedUsers[socket.id] = data.userId;
        //     const user = await User.findById(data.userId);
        //     console.log(`User ${user.name} is online`);
        //     user.status = 'online';
        //     await user.save();
        //     const contacts = await Contact.find({ user: data.userId });
        //     contacts.map(async (id) => {
        //         const contact = await Contact.findById(id);
        //         console.log(contact.room);
        //         io.to(contact.room).emit('contactStatusUpdate', { roomId: contact.room, status: 'online' });
        //     });
        //     console.log(connectedUsers);
        // });

        socket.on('join', async (data, callback) => {
            socket.join(data.room);
            console.log(`User joined room: ${data.room}`);
            const room = await Room.findById(data.room)?.populate('readMessages').populate('unreadMessages');
            const messages = room.readMessages;
            const unreadMessages = room.unreadMessages;
            callback(null, {
                readMessages: messages,
                unreadMessages: unreadMessages,
            });
            if (room.unreadMessageSender && (room.unreadMessageSender.toString() !== data.userId)) {
                room.unreadMessagesCount = 0;
                unreadMessages.map(async (message) => {
                    room.readMessages.push(message);
                    room.readMessagesCount += 1;
                });
                room.unreadMessages = [];
                await room.save();
                io.to(data.room).emit('markMessagesRead', { roomId: data.room });
            }
            console.log(`User joined room: ${data.room}`);
        });

        const handleUnreadMessage = async (data) => {
            const room = await Room.findById(data.roomId);
            room.unreadMessagesCount += 1;
            room.unreadMessages.push(data.messageId);
            room.unreadMessageSender = data.sender;
            room.lastMessage = data.messageId;
            room.lastMessageSender = data.sender;
            await room.save();
        };

        const handleReadMessage = async (data) => {
            const room = await Room.findById(data.roomId);
            room.readMessages.push(data.messageId);
            room.readMessagesCount += 1;
            room.lastMessage = data.messageId;
            room.lastMessageSender = data.sender;
            await room.save();
        };

        socket.on('bulkJoin', async (data, callback) => {
            socket.join(data.room);
            const room = await Room.findById(data.room)?.populate('readMessages');
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
                console.log('message not recieved');
                socket.emit('messageNotRecieved', { message });
                handleUnreadMessage({ roomId: data.room, sender: data.sender, messageId: message._id });
            }
            else {
                try {
                    console.log('message recieved');
                    const responce = await socket.timeout(5000).broadcast.to(data.room).emitWithAck(`newMessage`, {
                        message,
                        roomId: data.room,
                        contactId: data.contact,
                    });
                    console.log(responce);
                    if (responce[0].messageSeen) {
                        handleReadMessage({ roomId: data.room, sender: data.sender, messageId: message._id });
                        socket.emit('messageSeen', { message });
                        console.log('message seen');
                    }
                    else {
                        handleUnreadMessage({ roomId: data.room, sender: data.sender, messageId: message._id });
                        socket.emit('messageNotSeen', { message });
                        console.log('message not seen');
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
        socket.on('deleteMessage', async (data) => {
            const message = await Message.findById(data.messageId);
            message.status = 'deleted';
            message.content = 'This message has been deleted';
            message.save();
            io.to(data.roomId).emit('messageDeleted', { messageId: data.messageId, roomId: data.roomId });
        });
        // socket.on('messageSeen', async (data) => {
        //     handleReadMessage(data);
        //     console.log('message seen');
        // });

        // socket.on('messageNotSeen', async (data) => {
        //     handleUnreadMessage(data);
        //     console.log('message not seen');
        // });

        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`);
            // const userId = connectedUsers[socket.id];
            // const user = await User.findById(userId);
            // console.log(connectedUsers, userId, user);
            // const currentTime = new Date();
            // const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
            // user.status = `last seen at ${formattedTime}`;
            // await user.save();
            // const contacts = await Contact.find({ user: userId });
            // contacts.map(async (contact) => {
            //     io.to(contact.room).emit('contactStatusUpdate', { roomId: contact.room, status: `last seen at ${formattedTime}` });
            // });
            // delete connectedUsers[socket.id];
        });
    });

    return io;
};

export default initializeSocket;
