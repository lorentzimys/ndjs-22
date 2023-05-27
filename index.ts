import express from "express";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname, 
});

import { PORT } from "./config";
import { booksRouter } from "./routes/books";
import { indexRouter } from "./routes";

/**
 * APP INIT
*/
const app = express();


// Configuration
app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "./layouts/full-width");

// Routing
app.use(indexRouter);
app.use(booksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});