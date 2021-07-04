const express = require("express");
const pool = require("../models/connection");
const bcrypt = require("bcrypt");

const router = express.Router();

//Sign-up Route
router.post("/signup", async (req, res) => {

  let { email } = req.body;

  // prêt à mettre l'email en minuscules dans la base de données
  email = email.toLowerCase();

  //Hashing passwords with bcrypt
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(salt);


  const userData = {
    email,
    password: hashedPassword
  };

  //Stockage des données dans table
  pool.query("INSERT INTO users SET ?", userData, err => {
    if (err) {
      res.status(400).json({
        message: "Unable to add user"
      });
    } else {
      res.status(200).json({
        message: "User added successfully"
      });
    }
  });
});

//Sign-in Route
router.post("/signin", (req, res) => {
  let { email, password } = req.body;

  // prêt à mettre l'email en minuscules dans la base de données
  email = email.toLowerCase();

  //query out the user from the email
  pool.query(
    "SELECT * FROM users where email = ?",
    email,

    //doit passer async ici pour bcrypt
    async (err, rows) => {
      console.log(rows);
      
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

