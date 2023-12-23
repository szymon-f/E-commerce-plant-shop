const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { saltRounds } = require("../config/app.config");
const User = require("../models/user.model");

const registerValidator = [
  check("username", "username must be of length from 4 to 12 characters")
    .notEmpty()
    .isLength({ min: 4, max: 12 }),
  check("email", "Email is not valid").isEmail(),
  check("password", "password must be of length form 6 to 12 characters")
    .notEmpty()
    .isLength({ min: 6 }),
  check(
    "confirm-password",
    "password must be of length form 6 to 12 characters"
  )
    .notEmpty()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

function registerControllerPost(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, email, password } = req.body;
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        userModel.create(new User(username, email, hash), (err, data) => {
          if (err) {
            req.flash("Coś poszło nie tak, spróbuj jeszcze raz.");
            res.redirect("register");
            return;
          } else {
            // new user created successfully
            req.flash(
              "redirectFromRegisterMsg",
              "Pomyślnie zarejestrowano, możesz się zalogować"
            );
            res.redirect("login");
          }
        });
      });
  } else {
    const errorMessages = errors.array();
    for (let i = 0; i < errorMessages.length; i++) {
      req.flash(errorMessages[i]["path"], errorMessages[i]["msg"]);
    }
    res.redirect("register");
  }
}

module.exports = { registerControllerPost, registerValidator };
