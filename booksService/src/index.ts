import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname, 
});

import { PORT } from "@root/config";
import { booksRouter } from "@root/routes/books";
import { indexRouter } from "@root/routes";

/**
 * APP INIT
*/
const app = express();

// Configuration
app.use(express.static(path.resolve("public")));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", path.resolve("views", "layouts", "full-width"));

// Routing
app.use(indexRouter);
app.use(booksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});