require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMilddelware = require("./middleware/error");

const db = require("./db/db");
const app = express();
const router = require("./controller");

//connect to mongo db
db.connectDatabase();

//Middleware

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api", router);
app.use(errorMilddelware);

module.exports = app;
