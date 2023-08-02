const {
  PORT = 3000,
  MONGO_DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = {
  PORT,
  MONGO_DB_URL,
};
