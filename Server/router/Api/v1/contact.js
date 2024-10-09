import { Router } from "express";
const router = Router();

import { clearChat } from "../../../controllers/Api/v1/contact.js";


router.put('/clearChat/:roomId', clearChat);


export default router;