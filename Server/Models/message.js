import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    status: {
        type: String,
        default: 'sent'
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;