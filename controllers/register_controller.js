const { check, validationResult } = require("express-validator");

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
    req.flash(
      "redirectFromRegisterMsg",
      "Pomyślnie zarejestrowano, możesz się zalogować"
    );
    res.redirect("login");
  } else {
    const errorMessages = errors.array();
    for (let i = 0; i < errorMessages.length; i++) {
      req.flash(errorMessages[i]["path"], errorMessages[i]["msg"]);
    }
    res.redirect("register");
  }
}

module.exports = { registerControllerPost, registerValidator };
