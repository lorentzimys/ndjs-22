import { addAliases } from "module-alias";
import express from "express";

addAliases({
  "@root": __dirname,
});

import { PORT } from "@root/config";
import { userRouter } from "@root/routes/user";
import { booksRouter } from "@root/routes/books";

/**
 * APP INIT
*/

const app = express();

app.use(
  express.urlencoded({ extended: true })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(userRouter);
app.use(booksRouter);
