const pg = require("../pg");

const getAuth = (_, res) => {
  res.render("auth");
};

const postAuth = async (req, res) => {
  const { email, password, isSafe } = req.body;
  const safeFlag = isSafe === "safe";
  try {
    if (!safeFlag) {
      pg.query(
        `select * from users where email='${email}' and password='${password}' limit 1`
      ).then((queryRes) => {
        console.log(queryRes);
        if (queryRes.rowCount === 0) {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        } else {
          req.session.user = queryRes.rows > 0 && queryRes.rows[0];
          return res.status(200).json({ message: "Successfully authed" });
        }
      });
    } else {
      pg.query({
        text: "select * from users where email=$1 and password=$2 limit 1",
        values: [email, password],
      }).then((queryRes) => {
        if (queryRes.rowCount === 0) {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        } else {
          req.session.user = queryRes.rows[0];
          return res.status(200).json({ message: "Successfully authed" });
        }
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

function logOut(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      next();
    } else {
      res.clearCookie("uid");
      return res.redirect("/auth");
    }
  });
}

module.exports = {
  getAuth,
  postAuth,
  logOut,
};
