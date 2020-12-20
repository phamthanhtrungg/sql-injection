const controllers = require("./controllers");
const { authChecker, authCheckerTwo } = require("./middlewares");

module.exports = [
  {
    path: "/",
    action: controllers.defaultController.default,
    method: "get",
    middlewares: [authChecker],
  },
  {
    path: "/auth",
    action: controllers.authController.getAuth,
    method: "get",
    middlewares: [authCheckerTwo],
  },
  {
    path: "/auth",
    action: controllers.authController.postAuth,
    method: "post",
    middlewares: [],
  },
  {
    path: "/logout",
    action: controllers.authController.logOut,
    method: "post",
    middlewares: [],
  },
];
