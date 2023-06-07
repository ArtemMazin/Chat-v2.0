const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  }
  if (err.message === 'NotFound') {
    return res.status(404).send({
      message: 'Объект не найден',
    });
  }
  return res.status(500).send({ message: 'Произошла ошибка сервера' });
};

export default handleErrors;
