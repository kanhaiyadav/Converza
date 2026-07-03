// Single source of truth for allowed origins, shared by the HTTP (Express/CORS)
// and WebSocket (Socket.IO) servers so they never drift out of sync.
const allowedOrigins = [
    "http://localhost:8000",
    "https://converza.vercel.app",
    "https://converza-azpcpnquo-kanishys-projects.vercel.app",
    "https://chat.kanhaiya.me",
];

export default allowedOrigins;
