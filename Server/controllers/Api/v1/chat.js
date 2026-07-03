import Chat from "../../../Models/chat.js";
import User from "../../../Models/user.js";

const getChats = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        // A user may only list their own chats, never another user's.
        if (userId !== req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const chats = await Chat.find({
            participants: userId,
            deletedBy: { $ne: userId },
        }).populate("participants");
        res.status(200).json({
            error: null,
            data: chats,
        });
    } catch (error) {
        console.error("Error retrieving chats:", error);
        res.status(500).json({ error: "Failed to retrieve chats" });
    }
};

const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        if (
            !Array.isArray(participants) ||
            participants.length < 2 ||
            !participants.every((p) => typeof p === "string" && p.trim().length > 0)
        ) {
            return res
                .status(400)
                .json({
                    error: "At least two valid usernames are required to create a chat.",
                });
        }

        // The requester must be one of the participants they're creating a chat for.
        const requestingUser = await User.findById(req.user.id);
        if (!requestingUser || !participants.includes(requestingUser.username)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const users = await Promise.all(
            participants.map((username) => User.findOne({ username }))
        );

        const missingIndex = users.findIndex((user) => !user);
        if (missingIndex !== -1) {
            return res.status(404).json({
                error: `User with username ${participants[missingIndex]} not found.`,
            });
        }

        const participantUserIds = users.map((user) => user._id.toString());

        let chat = await Chat.findOne({
            participants: { $all: participantUserIds, $size: participantUserIds.length },
        });
        if (chat) {
            // If the requester had previously soft-deleted this chat, treat
            // "add contact" as bringing it back instead of a dead-end error.
            if (chat.deletedBy.some((id) => id.toString() === req.user.id)) {
                chat = await Chat.findByIdAndUpdate(
                    chat._id,
                    { $pull: { deletedBy: req.user.id } },
                    { new: true }
                );
                await chat.populate("participants");
                return res.status(200).json({ error: null, data: chat });
            }
            return res.status(409).json({
                error: "Chat already exists with these participants.",
            });
        }
        chat = new Chat({ participants: participantUserIds });
        await chat.save();
        await chat.populate("participants");

        // Notify every participant in realtime so the new chat shows up
        // without needing a refresh, and pull any of their live sockets
        // into the chat's room so subsequent messages/presence reach them
        // immediately instead of only after their next reconnect.
        const io = req.app.get('io');
        if (io) {
            const chatRoom = chat._id.toString();
            io.in(participantUserIds).socketsJoin(chatRoom);
            io.to(chatRoom).emit('new-chat', chat);
        }

        res.status(201).json({
            error: null,
            data: chat,
        });
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ error: "Failed to create chat" });
    }
};

const getChatForParticipant = async (chatId, userId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;
    const isParticipant = chat.participants.some((p) => p.toString() === userId);
    return isParticipant ? chat : null;
};

// Soft delete: only hides the chat from the requester's own list.
const deleteChat = async (req, res) => {
    try {
        const chat = await getChatForParticipant(req.params.chatId, req.user.id);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        await Chat.findByIdAndUpdate(chat._id, { $addToSet: { deletedBy: req.user.id } });
        res.status(200).json({ error: null, message: "Chat deleted" });
    } catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).json({ error: "Failed to delete chat" });
    }
};

// Toggles this chat between blocked/unblocked for the requester. Any
// participant blocking the chat halts messaging for both sides.
const toggleBlockChat = async (req, res) => {
    try {
        const chat = await getChatForParticipant(req.params.chatId, req.user.id);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        const alreadyBlocked = chat.blockedBy.some((id) => id.toString() === req.user.id);
        if (alreadyBlocked) {
            chat.blockedBy = chat.blockedBy.filter((id) => id.toString() !== req.user.id);
        } else {
            chat.blockedBy.push(req.user.id);
        }
        await chat.save();
        await chat.populate("participants");
        res.status(200).json({ error: null, data: chat });
    } catch (error) {
        console.error("Error toggling block status:", error);
        res.status(500).json({ error: "Failed to update block status" });
    }
};

export { createChat, getChats, deleteChat, toggleBlockChat };
