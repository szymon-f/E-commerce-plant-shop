const sqlite3 = require("sqlite3").verbose();
const appConfig = require("../config/app.config");

const db = new sqlite3.Database(appConfig.dbsource, (err) => {
  if (err) {
    console.error("Failed to connect to the database");
    throw err;
  } else {
    console.log("Successfully connected to the database");
  }
});

module.exports = db;
