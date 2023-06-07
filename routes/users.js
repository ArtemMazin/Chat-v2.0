import { Router } from 'express';
import { createUser, getUsers } from '../controllers/users';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);

export default router;
