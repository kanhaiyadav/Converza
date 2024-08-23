import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";
import './config/mongoose.js';
import path from 'path';
import router from './router/index.js';

const createServer = async () => {
    const app = express();
    const port = 3000;
    const chatPort = 5000;

    const allowedOrigins = ["http://localhost:8000"];
    const corsOptions = {
        origin: function (origin, callback) {
            // Allow requests with no origin like mobile apps or curl requests
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    };

    // Apply CORS middleware
    app.use(cors(corsOptions));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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

    app.use('/', router);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

createServer();