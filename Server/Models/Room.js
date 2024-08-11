import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
    }
});

const Room = mongoose.model('Room', roomSchema);
export default Room;