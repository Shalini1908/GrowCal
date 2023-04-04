const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware/authenticate.middleware");

userRouter.get("/", (req, res) => {
  res.send("User");
});

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    bcrypt.hash(password, 5, async (err, secured_pass) => {
      if (err) {
        res.send({ msg: "Something went wrong" });
      } else {
        const user = new UserModel({ name, email, password: secured_pass });
        await user.save();
        res.send({ msg: "User Registered" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(name,email,password)
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({
            msg: "Logged in",
            token: token,
            user,
            timestamp: new Date(),
          });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Can't login" });
    console.log(err);
  }
});

userRouter.get("/getProfile", authenticate, async (req, res) => {
  let id = req.body.userID;

  try {
    let user = await UserModel.findById(id);
    res.send({ user, timestamp: new Date() });
  } catch (err) {
    res.send("error in get profile");
  }
});

module.exports = {
  userRouter,
};
