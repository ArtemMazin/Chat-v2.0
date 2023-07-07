import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const register = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }).then((user) => {
      console.log(user);
      res.status(201)
        .send({ data: user.toJSON() });
    }))
    .catch((err) => {
      if (err.code === 11000) {
        console.log(err);
        next(new Error('Пользователь с таким email уже существует'));
      }
      console.log(err);
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ data: user.toJSON() });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Выход' });
};

export {
  register, login, getUsers, logout,
};
