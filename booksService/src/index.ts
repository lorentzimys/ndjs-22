import express from "express";
import path from "path";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname, 
});

import { PORT, MONGO_URL } from "@root/config";
import routes from "@root/routes";

/** MongoDB initialization function */
const initMongoDb = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: "ndjs-22",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};


/** Application initialization function */
const initApp = async (app: express.Express) => {
  await initMongoDb();

  // Configuration
  app.use(express.static(path.resolve("public")));
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.set("views", path.resolve("views"));
  app.set("view engine", "ejs");
  
  app.use(expressLayouts);

  app.use("/", (req, res, next) => {
    app.set("layout", path.resolve("views", "layouts", "full-width"));
    next();
  });
  
  app.use("/books", (req, res, next) => {
    app.set("layout", path.resolve("views", "layouts", "container-width"));
    next();
  });
  
  // Routing
  Object.values(routes).forEach(router => app.use(router));
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

/**
 * APP INIT
*/
const app = express();

initApp(app);

