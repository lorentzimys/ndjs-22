/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

const ENCODING = "utf8";

const HOST = process.env.HOST || "localhost";

const PORT = process.env.PORT || 4000;

const REDIS_HOST = process.env.REDIS_HOST || HOST;

const REDIS_PORT = process.env.REDIS_PORT || 6379;

export {
  ENCODING,
  HOST,
  PORT,
  REDIS_HOST,
  REDIS_PORT
};
