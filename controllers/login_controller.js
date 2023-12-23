const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");


function loginControllerGet(req, res) {
  res.render("login", { messages: req.flash() });
}

function loginControllerPost(req, res) {
  const { username, password } = req.body;
  userModel.getByUsername(username, (err, data) => {
    if (err) {
      req.flash("badLogin", "Zła nazwa użytkownika");
      res.redirect("login");
    } else {
      bcrypt.compare(password, data.passwordHash).then((ok) => {
        if (ok) {
          req.session.user = {
            logged: true,
            cart: [],
            username: req.body.username,
          };
          res.redirect("products");
        } else {
          req.flash("badLogin", "Złe hasło");
          res.redirect("login");
        }
      });
    }
  });
}

module.exports = { loginControllerGet, loginControllerPost };
