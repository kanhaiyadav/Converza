import { Router } from "express";
const router = Router();
import { signUp, update, signIn, newContact, getContacts } from "../../../controllers/Api/v1/user.js";

router.post('/signup', signUp);
router.get('/update/:chatid/:id', update);
router.post('/signin', signIn);
router.get('/contacts/:id', getContacts);
router.post('/newContact', newContact);

export default router;