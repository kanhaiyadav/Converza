import Message from "../../../Models/message.js";
import Chat from "../../../Models/chat.js";

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        // Only participants of the chat may read its messages.
        const isParticipant = chat.participants.some(
            (participantId) => participantId.toString() === req.user.id
        );
        if (!isParticipant) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const messages = await Message.find({ chat: chatId }).sort({
            createdAt: 1,
        });

        res.status(200).json({ error: null, data: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({
            message: "Failed to fetch messages",
            code: "FETCH_MESSAGES_ERROR",
        });
    }
};
