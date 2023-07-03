import User from '../models/user';
import handleErrors from '../utils/utils';

const createUser = (req, res) => {
  const { email, userPassword } = req.body;

  User.findOne({ email }).then((u) => {
    console.log(u.userPassword, userPassword);
    if (!u) {
      User.create({ email, userPassword })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => handleErrors(err, res));
    } else if (Number(userPassword) === u.userPassword) {
      console.log(`${email} вошел в систему`);
    } else {
      console.log('неверный пароль');
    }
  });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

export { createUser, getUsers };
