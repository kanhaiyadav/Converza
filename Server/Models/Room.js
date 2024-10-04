import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    readMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    unreadMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    readMessagesCount: {
        required: true,
        type: Number,
        default: 0
    },
    unreadMessagesCount: {
        required: true,
        type: Number,
        default: 0
    },
    unreadMessageSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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