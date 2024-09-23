import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";
import './config/mongoose.js';
import path from 'path';
import router from './router/index.js';
import initializeSocket from './socket/socketHandler.js';

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
    
    initializeSocket(server);

    server.listen(chatPort, () => {
        console.log(`Chat Server listening on port ${chatPort}`);
    });

    app.use('/', router);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

createServer();