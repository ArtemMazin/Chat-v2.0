import { Router } from 'express';
import { getUsers, getProfile, updateProfile } from '../controllers/users.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getProfile);
router.patch('/users/me', updateProfile);

export default router;
