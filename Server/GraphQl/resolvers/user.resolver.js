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
                return {
                    user: user,
                    token: "Bearer " + jwt.sign(user.toJSON(), "kanhaiya", { expiresIn: '1d' })
                };
                }
                catch (err) {
                    throw new Error(err.message);
                }
        }
    },
};

export default userResolver;