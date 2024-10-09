import { Router } from "express";

const router = Router();
import userRouter from "./user.js";
import contactRouter from "./contact.js";

router.use('/user', userRouter);
router.use('/contact', contactRouter);

export default router;