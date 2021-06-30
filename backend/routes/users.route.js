const express = require("express");
const pool = require("../models/connection");
const bcrypt = require("bcrypt");

const router = express.Router();

//Sign-up Route
router.post("/signup", async (req, res) => {
  //destructuring
  let { email } = req.body;

  //ready to set lower case email to database
  email = email.toLowerCase();

  //Hashing passwords with bcrypt
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(salt);

  //One object instead of SET (?, ?)
  const userData = {
    email,
    password: hashedPassword
  };

  //Storing data into table users
  pool.query("INSERT INTO users SET ?", userData, err => {
    if (err) {
      res.status(400).json({
        status: "failure",
        message: "Unable to add user"
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User added successfully"
      });
    }
  });
});

//Sign-in Route
router.post("/signin", (req, res) => {
  //destructuring
  let { email, password } = req.body;

  //in case user enter uppercase
  email = email.toLowerCase();

  //query out the user from the email
  pool.query(
    "SELECT * FROM users where email = ?",
    email,

    //have to pass async here for bcrypt
    async (err, rows) => {
      console.log(rows);
      //must finish the promise here before proceeding any further otherwise any passwords would return true
      if (await bcrypt.compare(password, rows[0].password)) {
        console.log("Successful");
        res.status(200).json({
          status: "success",
          message: "User signed in successfully"
        });
      } else {
        res.status(400).json({
          status: "failure",
          message: err
        });
      }
    }
  );
});

module.exports = router;

