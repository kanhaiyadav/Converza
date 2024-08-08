import User from '../../../Models/user.js';
import jwt from 'jsonwebtoken';

export const create = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create({
            name: req.body.name,
            phoneNo: req.body.phoneNo,
        });
        return res.status(200).json({
            data: user,
            message: "hey i will create a user"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ phoneNo: req.body.phoneNo });
        return res.status(200).json({
            data: {
                user: user,
                jwt: "Bearer " + jwt.sign(user.toJSON(), "kanhaiya", { expiresIn: '1d' }),
                contacts: await User.find()
            },
            message: "hey i logged in a user"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const update = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.chatId = req.params.chatid;
        await user.save();
        return res.status(200).json({
            data: {
                userInfo: await User.findById(req.params.id),
            },
            message: "hey i will update a user"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}