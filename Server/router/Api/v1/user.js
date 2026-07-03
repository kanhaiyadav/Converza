import { Router } from "express";
import rateLimit from "express-rate-limit";
const router = Router();
import { signUp, signIn } from "../../../controllers/Api/v1/user.js";

// Throttles brute-force / credential-stuffing attempts against auth endpoints.
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts, please try again later" },
});

router.post('/signup', authLimiter, signUp);
router.post('/signin', authLimiter, signIn);

export default router;
