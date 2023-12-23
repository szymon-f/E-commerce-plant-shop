const bcrypt = require("bcrypt");
const adminModel = require("../models/admin.model");

function loginAdminControllerPost(req, res) {
  const { username, password } = req.body;
  adminModel.getByUsername(username, (err, data) => {
    if (err) {
      // if the username wasn't in the database
      req.flash("badLogin", "Zła nazwa użytkownika");
      res.redirect("loginAdmin");
    } else {
      bcrypt.compare(password, data.passwordHash).then((ok) => {
        if (ok) {
          // the password was correct
          req.session.loggedAsAdmin = true;
          res.redirect("adminPanel");
        } else {
          // the  password didn't match
          req.flash("badLogin", "Złe hasło");
          res.redirect("loginAdmin");
        }
      });
    }
  });
}

function loginAdminControllerGet(req, res) {
  res.render("login_admin", { messages: req.flash() });
}

module.exports = {
  loginAdminControllerGet,
  loginAdminControllerPost,
};
