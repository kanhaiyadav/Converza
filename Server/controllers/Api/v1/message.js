import Message from "../../../Models/message.js";

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        // Fetch messages for the specified chat
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
