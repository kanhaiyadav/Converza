import User from "../../Models/user.js";

const userResolver = {
    Query: {
        getUsers: async () => {
            return await User.find();
        }
    },
};

export default userResolver;