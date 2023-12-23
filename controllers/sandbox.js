const userModel = require("../models/user.model");

userModel.getByUsername('user', (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data)
  }
});
