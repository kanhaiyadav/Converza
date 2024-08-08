import { Router } from "express";
const router = Router();
import { create, update, login } from "../../../controllers/Api/v1/user.js";

router.post('/create', create);
router.get('/update/:chatid/:id', update);
router.post('/login', login);

export default router;