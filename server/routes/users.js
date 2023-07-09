import { Router } from 'express';
import { getUsers, getProfile } from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getProfile);

export default router;
