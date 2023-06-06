import dotenv from "dotenv";

dotenv.config();

export const ENCODING = "utf8";

export const HOST = process.env.HOST || "localhost";

export const PORT = process.env.PORT || 3000;

export const COUNTER_SERVICE_HOST = process.env.COUNTER_SERVICE_HOST || HOST;

export const COUNTER_SERVICE_PORT = process.env.COUNTER_SERVICE_PORT || 4000;

export const COUNTER_SERVICE_URL = `http://${COUNTER_SERVICE_HOST}:${COUNTER_SERVICE_PORT}/counter`;