const createServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000; // Use one port for both servers (Render will provide this)

    const allowedOrigins = ["http://localhost:8000"];
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

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const server = http.createServer(app); // Create one server

    // Initialize socket on the same server
    initializeSocket(server);

    // Add your routes
    app.use('/', router);

    // Listen on the same port for both HTTP and Socket.io
    server.listen(port, () => {
        console.log(`Server and Chat server both listening on port ${port}`);
    });
};

createServer();
