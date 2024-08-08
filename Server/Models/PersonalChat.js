import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    otherUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;