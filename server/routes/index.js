import { Router } from 'express';
import userRoutes from './users';
import messageRoutes from './messages';
import { login, logout, register } from '../controllers/users';
import checkAuth from '../middlewares/auth';
import { loginValidation, registerValidation } from '../utils/validationConfig';
import NotFoundError from '../errors/NotFoundError';

const router = Router();

router.post('/signup', registerValidation, register);
router.post('/signin', loginValidation, login);

router.use(checkAuth);

router.use(userRoutes);
router.use(messageRoutes);

router.use('/signout', logout);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

export default router;
