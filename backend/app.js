const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMilddelware = require("./middleware/error");
const mongoose = require("mongoose");
const routes = require("./controller/routes");

const app = express();

//connect to MongoDb
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb conneected"))
  .catch((err) => console.log("error connecting mongodb ", err));

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

app.use("/api", routes);
app.use(errorMilddelware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;
