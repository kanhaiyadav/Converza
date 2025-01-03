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
        default: 'https://cdn-user-icons.flaticon.com/119661/119661384/1727453117299.svg?token=exp=1727613338~hmac=d6d187e0c15b37007103ba18ee13e174'
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }],
    status: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);
export default User;