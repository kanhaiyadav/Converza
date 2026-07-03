import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../Models/message.js";
import Chat from "../Models/chat.js";
import allowedOrigins from "../config/corsOrigins.js";
import { JWT_SECRET } from "../middleware/auth.js";

// Returns the chat if it exists and userId is one of its participants,
// otherwise null. Callers that only need a boolean can check truthiness.
const getChatIfParticipant = async (chatId, userId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;
    const ok = chat.participants.some((p) => p.toString() === userId);
    return ok ? chat : null;
};

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    // Every connection must present a valid JWT; the decoded user id is the
    // only source of truth for "who is this socket", never a client-supplied field.
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Authentication token is required"));
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            socket.data.userId = decoded.id;
            next();
        } catch (err) {
            next(new Error("Invalid or expired token"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.data.userId;

        // A personal room keyed by user id, independent of any chat room,
        // so the server can reach this user (e.g. to notify them of a chat
        // just created with them) even before they've joined that chat's room.
        socket.join(userId);

        socket.on("message", async (data) => {
            try {
                const chat = await getChatIfParticipant(data.chat, userId);
                if (!chat) return;
                if (chat.blockedBy.length > 0) {
                    socket.emit("messageBlocked", { chat: data.chat });
                    return;
                }
                const message = await Message.create({
                    ...data,
                    sender: userId,
                });
                io.in(data.chat).emit(`new-message`, message.toObject());
                if (message.status !== "read") {
                    await Chat.findByIdAndUpdate(data.chat, {
                        $inc: { unreadCount: 1 },
                    });
                }
                await Chat.findByIdAndUpdate(data.chat, {
                    lastMessage: {
                        content: data.content,
                        sender: userId,
                        timestamp: message.createdAt.toISOString(),
                    },
                    // New activity un-hides the chat for anyone who'd soft-deleted it.
                    $set: { deletedBy: [] },
                });
            } catch (err) {
                console.error("Error handling message event:", err);
            }
        });

        socket.on("deleteMessage", async (data) => {
            try {
                const message = await Message.findById(data.messageId);
                if (!message) return;
                if (message.sender?.toString() !== userId) return;
                message.status = "deleted";
                message.content = "This message has been deleted";
                await message.save();
                io.to(data.roomId).emit("messageDeleted", {
                    messageId: data.messageId,
                    roomId: data.roomId,
                });
            } catch (err) {
                console.error("Error handling deleteMessage event:", err);
            }
        });

        socket.on("join-online-room", async () => {
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
            socket
                .to(chatId)
                .timeout(5000)
                .emit("isActive", chatId, (err, response) => {
                    if (err) {
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
            if (!(await getChatIfParticipant(chatId, userId))) return;
            await Chat.findByIdAndUpdate(chatId, { $set: { unreadCount: 0 } });
            const messages = await Message.find({
                chat: chatId,
                status: { $in: ["sent", "delivered"] },
            });
            messages.forEach((message) => {
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
            socket.rooms.forEach((room) => {
                socket
                    .to(room)
                    .emit(`status-update:${room}`, { status: "offline" });
            });
        });
    });

    return io;
};

export default initializeSocket;
