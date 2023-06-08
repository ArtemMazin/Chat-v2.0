import User from '../models/user';
import handleErrors from '../utils/utils';

const createUser = (req, res) => {
  const { name } = req.body;

  User.create({ name })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

export { createUser, getUsers };