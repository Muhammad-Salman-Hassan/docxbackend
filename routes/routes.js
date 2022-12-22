const express = require("express");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");
const User = require("../models/User")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");

const privatekey =
  "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX";

router.post("/register", async (req, res) => {
  const user = req.body;
  await User.create(user);
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { cnic, password } = req.body;

  const user = await User.findOne({
    where: {
      cnic: cnic,
    },
  });

  if (!user) {
    return res.json({error:"Invalid Credentials"}).status(401);
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Invalid Credentials" });
    }

    const accessToken = sign({ usercnic: user.cnic, id: user.id }, privatekey, {
      expiresIn: "1H",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, //for development
      // secure: process.env.NODE_ENV === "production", for Production
    });

    res.status(200).json({ cnic, accessToken });
  });
});

router.get("/dashboard", auth, async (req, res) => {
  const token = await req.cookies.accessToken;
  const decodedToken = await jwt.verify(
    token,
    "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX"
  );

  // retrieve the user details of the logged in user
  const user = await decodedToken;

  // pass the user down to the endpoints here
  let cnic = (req.id = user);
  console.log(cnic);

  const singleuser = await User.findOne({
    where: {
      id: cnic.id,
    },
  });
  res.json({ message: "You are authorized to access me", singleuser });
});
module.exports = router;
