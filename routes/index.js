import { Router } from 'express';
import userRoutes from './users';

const router = Router();

router.use(userRoutes);

router.use('/', (req, res) => {
  res.status(404).send({
    message: 'Указан некорректный маршрут',
  });
});

export default router;
