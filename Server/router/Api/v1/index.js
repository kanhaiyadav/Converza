import { Router } from "express";

const router = Router();
import userRouter from "./user.js";
import chatRouter from "./chat.js";
import messageRouter from "./message.js";

router.use('/user', userRouter);
router.use('/chats', chatRouter);
router.use('/messages', messageRouter);

export default router;