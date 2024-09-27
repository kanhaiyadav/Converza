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
        default: 'https://cdn-user-icons.flaticon.com/119661/119661384/1727453117299.svg?token=exp=1727454094~hmac=3a42866001881b60450db104a0cb0442'
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }],
});

const User = mongoose.model('User', userSchema);
export default User;