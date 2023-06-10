import dotenv from "dotenv";

dotenv.config();

/* Main app */
const DEFAULT_PORT = 3000;

export const ENCODING = "utf8";

export const HOST = process.env.HOST || "localhost";

export const PORT = process.env.PORT || DEFAULT_PORT;

/* Counter service  */
const DEFAULT_COUNTER_SERVICE_PORT = 4000;

export const COUNTER_SERVICE_HOST = process.env.COUNTER_SERVICE_HOST || HOST;

export const COUNTER_SERVICE_PORT = process.env.COUNTER_SERVICE_PORT || DEFAULT_COUNTER_SERVICE_PORT;

export const COUNTER_SERVICE_URL = `http://${COUNTER_SERVICE_HOST}:${COUNTER_SERVICE_PORT}/counter`;

/* Mongo */
const DEFAULT_MONGO_PORT = 27017;

export const MONGO_HOST = process.env.MONGO_HOST || HOST;

export const MONGO_PORT = process.env.MONGO_PORT || DEFAULT_MONGO_PORT;

export const MONGO_URL = process.env.MONGO_URL || `mongodb://root:qwerty@${MONGO_HOST}:${MONGO_PORT}`;
