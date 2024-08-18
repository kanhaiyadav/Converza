import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";
import './config/mongoose.js';
// import router from './router/index.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'url';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { resolvers } from './GraphQl/resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createServer = async () => {
    const app = express();
    const port = 3000;
    const chatPort = 5000;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //GraphQL Server
    const typesArray = loadFilesSync(path.join(__dirname, './'), { extensions: ['graphql'] });
    const apolloServer = new ApolloServer({
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: resolvers,
        introspection: true,
    });
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: port }
    });
    console.log(`Apollo Server ready at ${url}`);

    //chat server
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join', (data) => {
            io.to(data.partner_id).emit('join_requested', data.source_id);
        })

        socket.on('message', (data) => {
            console.log(data);
            socket.broadcast.emit('messageRecieved', data.message);
        })


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        })
    });

    server.listen(chatPort, () => {
        console.log(`Chat Server listening on port ${chatPort}`);
    });
}

createServer();