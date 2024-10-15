import Room from "../../../Models/Room.js";
// import Contact from "../../../models/contact.js";
// import User from "../../../models/user.js";

export const clearChat = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        room.readMessages = [];
        room.unreadMessages = [];
        room.readMessagesCount = 0;
        room.unreadMessagesCount = 0;
        room.unreadMessageSender = null;
        room.lastMessage = null;
        await room.save();
        res.status(200).json({ message: "Chat cleared" });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }

};