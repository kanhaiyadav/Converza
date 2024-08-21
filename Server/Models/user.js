import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/128/9131/9131529.png'
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }],
});

const User = mongoose.model('User', userSchema);
export default User;