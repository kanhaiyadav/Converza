import Chat from "../../../Models/chat.js";
import User from "../../../Models/user.js";

const getChats = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const chats = await Chat.find({ participants: userId }).populate(
            "participants"
        );
        res.status(200).json({
            error: null,
            data: chats,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chats" });
    }
};

const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        console.log("Creating chat with participants:", participants);
        if (!participants || participants.length < 2) {
            return res
                .status(400)
                .json({
                    error: "At least two participants are required to create a chat.",
                });
        }
        let participantUserIds = [];
        participants.forEach(async (participant, index) => {
            const user = await User.findOne({ username: participant });
            console.log(`Participant ${index + 1}:`, user.username);
            if (!user) {
                return res
                    .status(404)
                    .json({
                        error: `User with username ${participant} not found.`,
                    });
            }
            participantUserIds.push(user._id.toString());
        });
        
        console.log("Participant User IDs:", participantUserIds);
        
        let chat = await Chat.findOne({
            participants: { $all: participantUserIds },
        });
        if (chat) {
            return res.status(401).json({
                error: "Chat already exists with these participants.",
            });
        }
        chat = new Chat({ participants: participantUserIds });
        await chat.save();
        await chat.populate("participants");
        // Emit chat creation event if using socket.io or similar
        res.status(201).json({
            error: null,
            data: chat,
        });
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ error: "Failed to create chat" });
    }
};

export { createChat, getChats };
