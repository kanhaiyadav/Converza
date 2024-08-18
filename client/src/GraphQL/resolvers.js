import { gql } from "@apollo/client";

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

const GET_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleLogin: (_, __, { cache }) => {
            const { isLoggedIn } = cache.readQuery({
                query: GET_LOGGED_IN
            });

            cache.writeQuery({
                query: GET_LOGGED_IN,
                data: { isLoggedIn: !isLoggedIn }
            });

            return isLoggedIn;
        }
    }
};