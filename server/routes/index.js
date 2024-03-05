import { Router } from 'express';
import userRoutes from './users.js';
import { login, logout, register } from '../controllers/users.js';
import checkAuth from '../middlewares/auth.js';
import { loginValidation, registerValidation } from '../utils/validationConfig.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = Router();

router.post('/signup', registerValidation, register);
router.post('/signin', loginValidation, login);

router.use(checkAuth);

router.use(userRoutes);

router.use('/signout', logout);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

export default router;
