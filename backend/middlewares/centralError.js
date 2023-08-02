const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: err.message });
  }
  res.status(err.statusCode).send({ message: 'Произошла ошибка' });
  next();
};

module.exports = centralError;
