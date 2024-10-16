import express from 'express';
import cors from 'cors';
import http from 'http';
import './config/mongoose.js'; // MongoDB connection
import router from './router/index.js';
import initializeSocket from './socket/socketHandler.js'; // Import the socket handler

const createServer = async () => {
    const app = express();
    const port = 3000;

    const allowedOrigins = ["http://localhost:8000", "https://converza.vercel.app","https://converza-azpcpnquo-kanishys-projects.vercel.app"];
    const corsOptions = {
        origin: function (origin, callback) {
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

    // Apply CORS and body parsers
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Set up routes
    app.use('/', router);

    // Create an HTTP server using the Express app
    const server = http.createServer(app);

    // Initialize Socket.io server, passing the HTTP server
    initializeSocket(server);

    // Start listening for both HTTP and WebSocket requests
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

createServer();
