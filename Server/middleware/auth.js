import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}

// Verifies the `Authorization: Bearer <token>` header and attaches the
// decoded { id, username } payload to req.user. Routes that read or write
// per-user data rely on req.user rather than trusting client-supplied ids.
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    const token = authHeader.slice("Bearer ".length);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id, username: decoded.username };
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authenticate;
