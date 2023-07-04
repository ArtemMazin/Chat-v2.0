import { Router } from 'express';
import userRoutes from './users';
import { login, register } from '../controllers/users';

const router = Router();

router.post('/signup', register);
router.post('/signin', login);

router.use(userRoutes);

router.use('/', (req, res) => {
  res.status(404).send({
    message: 'Указан некорректный маршрут',
  });
});

export default router;
