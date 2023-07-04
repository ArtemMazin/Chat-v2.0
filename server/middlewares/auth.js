import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const payload = jwt.verify(token, 'SECRET_KEY');
      req.user = payload;
    } catch (error) {
      next(new Error('Необходима авторизация'));
      return;
    }
  } else {
    next(new Error('Необходима авторизация'));
    return;
  }

  next();
};

export default checkAuth;
