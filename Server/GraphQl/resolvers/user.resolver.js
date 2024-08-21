import User from "../../Models/user.js";
import jwt from 'jsonwebtoken';

const userResolver = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
        login: async (_, { username, password }) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.password !== password) {
                    throw new Error("Invalid Password");
                }
                return {
                    user: user,
                    token: "Bearer " + jwt.sign(user.toJSON(), "kanhaiya", { expiresIn: '1d' })
                };
            }
            catch (err) {
                throw new Error(err.message);
            }
        },
    },
    Mutation: {
        SignUp: async (_, { name, username, password }) => {
            try {
                const user = await User.create({
                    name: name,
                    username: username,
                    password: password,
                });
                return ({
                    success: true,
                    message: "User created successfully",
                });
            }
            catch (err) {
                console.log(err)
                return ({
                    success: false,
                    message: err.message
                });
            }
        }
    },
};



export default userResolver;