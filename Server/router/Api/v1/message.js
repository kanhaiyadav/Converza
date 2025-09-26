import { Router } from "express";
import { getMessages } from "../../../controllers/Api/v1/message.js";
const router = Router();

router.get("/:chatId", getMessages);

export default router;
