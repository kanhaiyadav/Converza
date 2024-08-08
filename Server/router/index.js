import { Router } from 'express';
const router = Router();

import ApiRouter from './Api/index.js'

router.use('/api', ApiRouter);

export default router;