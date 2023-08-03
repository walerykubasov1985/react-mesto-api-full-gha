const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Ошибка' });
  } else {
    res.status(err.statusCode).send({ message: 'Ошибка' });
    next();
  }
};

module.exports = centralError;
