import User from "../../Models/user.js";
import jwt from 'jsonwebtoken';

const userResolver = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
        login: async (_, { phoneNo }) => {
            try {
                console.log(phoneNo);
                const user = await User.findOne({ phoneNo: phoneNo });
                console.log(user);
                if (!user) {
                    throw new Error("User not found");
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
        SignUp: async (_, {name, phoneNo}) => {
            try {
                const user = await User.create({
                    name: name,
                    phoneNo: phoneNo,
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