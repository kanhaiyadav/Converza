import { Router } from "express";
import { createChat, getChats, deleteChat, toggleBlockChat } from "../../../controllers/Api/v1/chat.js";
import authenticate from "../../../middleware/auth.js";
const router = Router();

router.use(authenticate);

router.post('/', createChat);
router.get('/:userId', getChats);
router.delete('/:chatId', deleteChat);
router.patch('/:chatId/block', toggleBlockChat);

export default router;
