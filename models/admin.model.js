const db = require("./db");

const Admin = function (username, passwordHash) {
  this.username = username;
  this.passwordHash = passwordHash;
};

// inserts a new admin to the admins table
Admin.create = (newAdmin, result) => {
  const query = "INSERT INTO admins VALUES (?,?);";
  const params = [newAdmin.username, newAdmin.passwordHash];
  db.run(query, params, function (err, data) {
    if (err) {
      console.error(
        "Error while inserting new admin into the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Added new admin to the database: ", {
      id: this.lastID,
      ...newAdmin,
    });
    result(null, { id: this.lastID, ...newAdmin });
  });
};

// gets the admin by the provided admin username
Admin.getByUsername = function (username, result) {
  const query = "SELECT * FROM admins WHERE username=?;";
  const params = [username];
  db.get(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while retrieving admin from the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Admin;
