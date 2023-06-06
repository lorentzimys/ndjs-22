import express from "express";
import bodyParser from "body-parser";
import { createClient } from "redis";

import { PORT, REDIS_HOST, REDIS_PORT } from "./config.js";

const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

export const initRedisDB = async () => {
  console.log('Redis Client Init Start');

  client.once('error', err => {
    console.log('Redis Client Error', err);
  });
  
  await client.connect();
}

/**
 * APP INIT
*/
const app = express();

await initRedisDB();

// Configuration
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

/** [POST]: Increment bookId */
app.post("/counter/:bookId/incr", async (req, res) => {
  const { bookId } = req.params;

  // Save it to redis db 
  const viewsCount = await client.incr(bookId);

  res.status(200).json({
    viewsCount
  });
});

/** [GET]: Get bookId current index */
app.get("/counter/:bookId", async (req, res) => {
  const { bookId } = req.params;

  const viewsCount = await client.get(bookId);

  res.status(200).json({
    viewsCount
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

