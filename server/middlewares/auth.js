import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const checkAuth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const payload = jwt.verify(token, 'SECRET_KEY');
      req.user = payload;
    } catch (error) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
  } else {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  next();
};

export default checkAuth;
