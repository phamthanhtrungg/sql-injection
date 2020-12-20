const session = require("express-session");

function authChecker(req, res, next) {
  if (!req.session.user || !req.cookies.uid) {
    return res.redirect("/auth");
  }
  next();
}

function authCheckerTwo(req, res, next) {
  if (req.session.user && req.cookies.uid) {
    return res.redirect("/");
  }
  next();
}

module.exports = { authChecker, authCheckerTwo };
