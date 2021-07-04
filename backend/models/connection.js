const mysql = require("mysql");
const config = require("../config/config.js");

//set up for mysql
const connection = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE
});

module.exports = connection;
