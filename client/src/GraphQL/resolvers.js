// import { gql } from "@apollo/client";

// export const typeDefs = gql`
//     extend type Query {
//         isLoggedIn: Boolean!
//     },
//     extend type Mutation {
//         toggleLogin: Boolean!
//     }
// `;

// export const GET_LOGGED_IN = gql`
//     {
//         isLoggedIn @client
//     }
// `;

// export const resolvers = {
//     // Query: {
//     //     isLoggedIn: (_, __, { cache }) => {
//     //         const { isLoggedIn } = cache.readQuery({
//     //             query: GET_LOGGED_IN
//     //         });

//     //         return isLoggedIn;
//     //     }
//     // },
//     Mutation: {
//         toggleLogin: (_, __, { cache }) => {
//             const { isLoggedIn } = cache.readQuery({
//                 query: GET_LOGGED_IN
//             });

//             cache.writeQuery({
//                 query: GET_LOGGED_IN,
//                 data: { isLoggedIn: !isLoggedIn }
//             });

//             return isLoggedIn;
//         }
//     }
// };