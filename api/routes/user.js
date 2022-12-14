const express = require("express");
const { generateToken, validateToken } = require("../config/token");
const { validateAuth } = require("../middlewares/auth");

const router = express.Router();
const {User} = require("../models");

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    console.log("USER", user);
    res.status(201).send(user);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});


router.get("/me", validateAuth, (req, res) => {
  console.log(req.user)
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});




module.exports = router;
