import { Router } from 'express';
import userRoutes from './users';
import { login, register } from '../controllers/users';
import checkAuth from '../middlewares/auth';

const router = Router();

router.post('/signup', register);
router.post('/signin', login);

router.use(checkAuth);

router.use(userRoutes);

router.use('*', (req, res, next) => next(new Error('Указан некорректный маршрут')));

export default router;
