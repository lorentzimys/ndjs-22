import express from "express";
import session from "express-session";
import { Server } from "socket.io";
import http from "http";

import passport from "passport";
import { Strategy, VerifyFunction }from "passport-local";

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
import { IUser, UserModel } from "@root/models/User";

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

const configureAuth = (app: express.Express) => {
  const passportOptions = {
    usernameField: "email",
    passwordField: "password",
  };

  const verifyPassword = (user: IUser, password: string) => {
    return user.password === password;
  };

  const verify: VerifyFunction = (email: string, password: string, done: any) => {
    UserModel.findOne({ email })
      .then((user) => {
        console.log(user);
        if (!user) { return done(null, false); }
  
        if (!verifyPassword(user, password)) {
          return done(null, false);
        }
  
        return done(null, user);
      })
      .catch((err) => done(err));
  };

  app.use(session({
    secret: "SECRET",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new Strategy(passportOptions, verify));

  passport.serializeUser((user: any, cb) => cb(null, user._id));

  passport.deserializeUser((id, cb) => {
    UserModel.findById(id)
      .then((user: any) => {
        cb(null, user);
      })
      .catch(err => cb(err));
  });
};

const initSocketConnection = (app: express.Express) => {
  const httpServer = http.createServer(app);
  const options = {
    cors: {
      origin: ["http://localhost:3000"]
    }
  };
  const io = new Server(httpServer, options);

  io.listen(3001);

  io.on("connection", (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    // работа с комнатами
    const roomName = socket.handshake.query.roomName as string;

    socket.join(roomName);

    socket.on("message-to-room", (msg) => {
      msg.type = `room: ${roomName}`;
      socket.to(roomName).emit("message-to-room", msg);
      socket.emit("message-to-room", msg);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
};

/** Application initialization function */
const initApp = async (app: express.Express) => {
  await initMongoDb();

  // Configuration
  app.use(express.static(path.resolve("public")));
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true }));
  
  configureAuth(app);

  initSocketConnection(app);
  
  app.set("views", path.resolve("views"));
  app.set("view engine", "ejs");
  
  app.use(expressLayouts);

  app.use("/", (req, res, next) => {
    app.set("layout", path.resolve("views", "layouts", "full-width"));
    next();
  });

  app.use("/login", (req, res, next) => {
    app.set("layout", path.resolve("views", "layouts", "blank"));
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

