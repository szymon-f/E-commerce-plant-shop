const path = require('path');

module.exports = {
  port: "3000",
  dbsource: "db.sqlite",
  cookieMaxAge: 60*60000,
  cookieSecretKey: "NotSoSecret",
  sessionSecret: "SesssionSecret",
  saltRounds: 10,
  APIkey: "badfd880e554e9747e4d7021985f1d5a",
  filePath: path.join(__dirname, '../', 'uploads')
};
