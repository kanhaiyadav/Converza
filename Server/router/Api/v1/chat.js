import { Router } from "express";
import { createChat, getChats } from "../../../controllers/Api/v1/chat.js";
const router = Router();


router.post('/', createChat);
router.get('/:userId', getChats);

export default router;