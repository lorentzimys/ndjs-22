const dotenv = require('dotenv');

dotenv.config();

const ENCODING = 'utf8';

const HOST = process.env.HOST || 'localhost';

const PORT = process.env.PORT || 3000;

module.exports = {
  ENCODING,
  HOST,
  PORT
}