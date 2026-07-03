import { Router } from "express";
import { getMessages } from "../../../controllers/Api/v1/message.js";
import authenticate from "../../../middleware/auth.js";
const router = Router();

router.use(authenticate);

router.get("/:chatId", getMessages);

export default router;
