const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const path = require("path");
const routes = require("./routes");

function runApp() {
  const app = express();
  const PORT = +process.env.PORT || 3005;

  app.set("view engine", "pug");
  app.set("views", path.join(process.cwd(), "src/views"));

  app.use(express.static(path.join(process.cwd(), "src/public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: "my_secret",
      name: "uid",
      cookie: { maxAge: 600000 },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use((req, res, next) => {
    if (req.cookies.uid && !req.session.user) {
      res.clearCookie("uid");
    }
    next();
  });

  routes.forEach((route) => {
    app[route.method](route.path, ...route.middlewares, (req, res, next) => {
      if (!route.action.then) {
        route.action(req, res, next);
      } else {
        route
          .action(req, res, next)
          .then(() => next())
          .catch((err) => next(err));
      }
    });
  });

  app.listen(PORT, () =>
    console.log(`app is running at http://localhost:${PORT}`)
  );
}

runApp();
