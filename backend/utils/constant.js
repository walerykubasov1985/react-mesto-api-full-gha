const {
  PORT = 4000,
  MONGO_DB_URL = 'mongodb://127.0.0.1:27017/mestowawa',
} = process.env;

module.exports = {
  PORT,
  MONGO_DB_URL,
};
