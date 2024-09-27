import User from '../../../models/user.js';
import Contact from '../../../models/contact.js';
import Room from '../../../models/room.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm Password do not match"
            });
        } else {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                return res.status(400).json({
                    message: "User already exists"
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

export const getContacts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'contacts',
            populate: [
                { path: 'user' },
                {
                    path: 'room',
                    select: 'lastMessage unreadMessagesCount unreadMessagesSender',
                    populate: {
                        path: 'lastMessage',
                    }
                }
            ]
        });
        if (user) {
            return res.status(200).json({
                data: {
                    contacts: user.contacts,
                },
                message: "Contacts fetched successfully"
            });
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

export const newContact = async (req, res) => {
    try {
        const me = await User.findOne({ username: req.body.myUsername });
        const they = await User.findOne({ username: req.body.theirUsername });
        if (they) {
            await me.populate('contacts');
            if (me.contacts.find(contact => contact.user.toString() === they._id.toString())) {
                return res.status(400).json({
                    message: "Contact already exists"
                });
            }
            else {
                const room = await Room.create({});
                const theirContact = await Contact.create({
                    user: they._id,
                    room: room._id
                });

                const myContact = await Contact.create({
                    user: me._id,
                    room: room._id
                });

                me.contacts.push(theirContact._id);
                await me.save();
                they.contacts.push(myContact._id);
                await they.save();

                const populatedTheirContact = await theirContact.populate('user room');
                return res.status(200).json({
                    data: {
                        contact: populatedTheirContact,
                    },
                    message: "Contact added successfully"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User not found"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

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