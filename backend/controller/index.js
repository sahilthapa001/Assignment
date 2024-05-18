const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("appRouter");
});

const userRouter = require("./user");

router.use("/user", userRouter);

// router.post("api/auth/login", async (req, res) => {
//   //..login logic (authenticate user, send token)
// });

// router.post("api/auth/signup", async (req, res) => {
//   //.. Signup logic (hash password, create user ,send token)
// });

// //protected route (requires middleware for authentication)

// router.get("api/auth/profile", async (req, res) => {
//   // .. get user data based on authentication
// });

module.exports = router;
