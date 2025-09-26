import { Server } from "socket.io";
import Message from "../Models/message.js";
import Chat from "../Models/chat.js";
import User from "../Models/user.js";
import { response } from "express";

const initializeSocket = (server) => {
    // const userActiveRooms = {};

    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:8000", "https://converza.vercel.app"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("message", async (data) => {
            const message = await Message.create(data);
            console.log("New message created:", message);
            io.in(data.chat).emit(`new-message`, message.toObject());
            if (message.status !== "read") { 
                await Chat.findByIdAndUpdate(data.chat, {
                    $inc: { unreadCount: 1 },
                });
            }
            await Chat.findByIdAndUpdate(data.chat, {
                lastMessage: {
                    content: data.content,
                    sender: data.sender,
                    timestamp: message.createdAt.toISOString(),
                },
            });
        });

        socket.on("deleteMessage", async (data) => {
            const message = await Message.findById(data.messageId);
            message.status = "deleted";
            message.content = "This message has been deleted";
            message.save();
            io.to(data.roomId).emit("messageDeleted", {
                messageId: data.messageId,
                roomId: data.roomId,
            });
        });

        socket.on("join-online-room", async (userId) => {
            const chats = await Chat.find({
                participants: userId,
            });
            chats.forEach((chat) => {
                socket.join(chat._id.toString());
                socket
                    .to(chat._id.toString())
                    .emit(`status-update:${chat._id.toString()}`, {
                        status: "online",
                    });
                console.log(`User ${userId} joined chat room: ${chat._id}`);
            });
        });

        socket.on("isOnline", (chatId, callback) => {
            const roomSize = io.sockets.adapter.rooms.get(chatId)?.size || 0;
            if (roomSize > 1) {
                callback({ status: "online" });
            } else {
                callback({ status: "offline" });
            }
        });

        socket.on("isActive", (chatId, callback) => {
            console.log("Is active requested for chat:", chatId);
            socket
                .to(chatId)
                .timeout(5000)
                .emit("isActive", chatId, (err, response) => {
                    console.log("Is active response received:", response);
                    if (err) {
                        console.error("Error in isActive response:", err);
                        callback({ isActive: false });
                        return;
                    }
                    if (response && response[0] && response[0].isActive) {
                        callback({ isActive: true });
                    } else {
                        callback({ isActive: false });
                    }
                });
        });

        socket.on("chat-is-active", async (chatId) => {
            socket
                .to(chatId)
                .emit(`status-update:${chatId}`, { status: "active" });
        });

        socket.on("reset-chat-unread", async (chatId) => {
            await Chat.findByIdAndUpdate(chatId, { $set: { unreadCount: 0 } });
            const messages = await Message.find({
                chat: chatId,
                status: { $in: ["sent", "delivered"] },
            });
            messages.forEach((message) => {
                console.log("Resetting message status to read:", message);
                socket.to(message.chat?.toString()).emit(`messageStatusUpdate:${message._id}`, {
                    status: "read",
                });
                message.status = "read";
                message.save();
            });
        })

        socket.on("chat-is-inactive", (chatId) => {
            const roomSize = io.sockets.adapter.rooms.get(chatId)?.size;
            if (roomSize && roomSize > 1) {
                socket
                    .to(chatId)
                    .emit(`status-update:${chatId}`, { status: "online" });
            } else {
                socket
                    .to(chatId)
                    .emit(`status-update:${chatId}`, { status: "offline" });
            }
        });

        socket.on("disconnecting", () => {
            console.log("User disconnecting:", socket.rooms);
            socket.rooms.forEach((room) => {
                console.log(`User ${socket.id} left room: ${room}`);
                socket
                    .to(room)
                    .emit(`status-update:${room}`, { status: "offline" });
            });
        });
    });

    return io;
};

export default initializeSocket;
