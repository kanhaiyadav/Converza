import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        lastMessage: {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: { type: String },
            timestamp: {
                type: String,
                default: () => new Date().toISOString(),
            },
        },
        unreadCount: { type: Number, default: 0 },
        // Soft delete: hides the chat from a user's own list without
        // affecting the other participant. Cleared automatically when new
        // activity happens in the chat so it reappears, like WhatsApp.
        deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        // Non-empty when either participant has blocked the chat; blocks
        // messaging for both sides until toggled off again.
        blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
