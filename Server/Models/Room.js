import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupName: {
        type: String,
    }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
export default Room;