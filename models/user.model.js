const db = require("./db");

const User = function (username, email, passwordHash) {
  this.username = username;
  this.email = email;
  this.passwordHash = passwordHash;
};

User.create = (newUser, result) => {
  const query =
    "INSERT INTO users (username, email, passwordHash) VALUES (?,?,?);";
  const params = [newUser.username, newUser.email, newUser.passwordHash];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Failed to insert new user into the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Inserted new user into the database: ", {
      id: this.lastID,
      ...newUser,
    });
    result(null, { id: this.lastID, ...newUser });
  });
};

User.getAll = (result) => {
  const query = "SELECT * FROM users;";
  const params = [];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error(
        "Failed to retrieve all users from the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

User.getByUsername = (username, result) => {
  const query = "SELECT * FROM users WHERE username=?;";
  const params = [username];
  db.get(query, params, function (err, row) {
    if (err) {
      console.error("Failed to retrieve user by username: ", err.message);
      result(err, null);
      return;
    }
    result(null, row);
  });
};

User.getByID = (userID, result) => {
  const query = "SELECT * FROM users WHERE userID=?;";
  const params = [userID];
  db.get(query, params, function (err, row) {
    if (err) {
      console.error("Failed to retrieve user by ID: ", err.message);
      result(err, null);
      return;
    }
    result(null, row);
  });
};

User.deleteByID = (userID, result) => {
  const query = "DELETE FROM users where userID=?;";
  const params = [userID];
  db.run(query, params, function (err, row) {
    if (err) {
      console.error("Failed to delete user by ID: ", err.message);
      result(err, null);
      return;
    }
    console.log(`Deleted user with ID: ${userID}`);
    result(null, userID);
  });
};

module.exports = User;
