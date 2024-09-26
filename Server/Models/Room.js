import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    unreadMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    unsentMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    unreadMessagesCount: {
        type: Number,
        default: 0
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