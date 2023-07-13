import { Router } from 'express';
import getMessages from '../controllers/messages';

const router = Router();

router.get('/messages', getMessages);

export default router;
