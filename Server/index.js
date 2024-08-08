import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";
import './config/mongoose.js';
import router from './router/index.js';


const app = express();
const port = 3000;
const chatPort = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
})


app.use("/", router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})