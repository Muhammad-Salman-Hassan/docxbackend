const express = require("express");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");
const User = require("../models/User")(sequelize, DataTypes);

const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const sendEmail = require("../services/sendEmail");
const crypto = require("crypto");
const privatekey =
  "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX";

router.post("/register", async (req, res) => {
  const user = req.body;
  
  let Existuser = await User.findOne({where:{email:user.email}});
  if (Existuser) {
    throw new Error("Email already exist");
  }

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
    return res.json({ error: "Invalid Credentials" }).status(401);
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

//////////Reset Password Routes

router.post("/forgetpassword", async (req, res) => {
  const email = req.body.email;
  const verifiedEmail = await User.findOne({ where: { email: email } });
  if (!verifiedEmail) {
    return res.json({ error: "Email Not Found In Our DataBase REcord" });
  }
  const userDetail = await User.findOne({ where: { email: email } });
  let resetToken = crypto.randomBytes(32).toString("hex");
  let bcryptSalt="10"
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  if(userDetail.tokens){
    userDetail.tokens=hash
  }
  // let token = randtoken.generate(20);
  // const sent = sendEmail(email, token);
  res.json(userDetail)
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
