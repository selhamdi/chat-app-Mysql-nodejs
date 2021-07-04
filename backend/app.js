const express = require("express");
// const morgan = require("morgan");
const cors = require("cors")

const usersRoutes = require("./routes/users.route");
// const chatRoutes = require("./routes/chat.route");

const port = process.env.PORT || 4000;

const app = express();

//Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//CORS
//Vous permet d'autoriser ou de limiter les ressources demandées sur le serveur Web 
// en fonction de l'endroit où la requête HTTP est effectuée.
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });


app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  res.status(404).send("error");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
