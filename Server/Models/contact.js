import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;