import dotenv from "dotenv";

dotenv.config();

export const ENCODING = "utf8";

export const HOST = process.env.HOST || "localhost";

export const PORT = process.env.PORT || 3000;
