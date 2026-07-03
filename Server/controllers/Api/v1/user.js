import User from '../../../Models/user.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../middleware/auth.js';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

export const signUp = async (req, res) => {
    try {
        const { displayName, username, password, confirmPassword } = req.body;

        if (!isNonEmptyString(displayName) || !isNonEmptyString(username) || !isNonEmptyString(password)) {
            return res.status(400).json({
                message: "Display name, username and password are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm Password do not match"
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        await User.create({
            name: displayName,
            username,
            password,
        });
        return res.status(200).json({
            message: "Signed Up Successfully",
        });
    }
    catch (err) {
        // Guards the rare race where two signups for the same username land
        // between the findOne check above and the unique index enforcing it.
        if (err.code === 11000) {
            return res.status(400).json({ message: "User already exists" });
        }
        console.error("Error in signUp:", err);
        return res.status(500).json({
            message: "Something went wrong while signing up"
        });
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({
            data: {
                user: userWithoutPassword,
                jwt: "Bearer " + jwt.sign(
                    { id: user._id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1d' }
                ),
            },
            message: "Signed In Successfully"
        });
    }
    catch (err) {
        console.error("Error in signIn:", err);
        return res.status(500).json({
            message: "Something went wrong while signing in"
        });
    }
}
