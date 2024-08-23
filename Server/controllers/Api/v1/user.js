import User from '../../../models/user.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        console.log("you're inside signup");
        console.log(req.body);
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm Password do not match"
            });
        } else {
            
            await User.create({
                name: req.body.displayName,
                username: req.body.username,
                password: req.body.password,
            });
            return res.status(200).json({
                message: "Signed Up Successfully",
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const signIn = async (req, res) => {
    try {
        console.log("you're inside signin");
        console.log(req.body);
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            if (user.password !== req.body.password) {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            } else {
                return res.status(200).json({
                    data: {
                        user: user,
                        jwt: "Bearer " + jwt.sign(user.toJSON(), "kanhaiya", { expiresIn: '1d' }),
                    },
                    message: "Signed In Successfully"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User not found"
            });
        }
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