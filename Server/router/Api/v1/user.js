import { Router } from "express";
const router = Router();
import { signUp, update, signIn } from "../../../controllers/Api/v1/user.js";

router.post('/signup', signUp);
router.get('/update/:chatid/:id', update);
router.post('/signin', signIn);

export default router;