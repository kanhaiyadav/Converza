import testResolver from "./test.resolver.js";
import userResolver from "./user.resolver.js";

export const resolvers = {
    ...testResolver,
    ...userResolver,
};