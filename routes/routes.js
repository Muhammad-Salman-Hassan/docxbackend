const express = require("express");
const { DataTypes, where } = require("sequelize");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const sendEmail = require("../services/sendEmail");
const crypto = require("crypto");
const db = require("../models");
const { json } = require("body-parser");
const { default: axios } = require("axios");
const User = db.user;
const Profile = db.userProfile;
const ApplicationsImage=db.ApplicationsImage

var privatekey = "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX";

router.post("/register", async (req, res) => {
  const user = req.body;

  let Existuser = await User.findOne({ where: { email: user.email },exclude: ['password'] });
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

    const accessToken = sign({ usercnic: user.cnic, id: user.id,role:user.role }, privatekey, {
      expiresIn: "1d",
    });
    console.log(user)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      // secure: process.env.NODE_ENV === "production", for Production
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({ cnic, accessToken, isAuth: true, role:user.role,user });
  });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("accessToken");
  res.json({ msg: "Logout", isAuth: false });
});

//////////Reset Password Routes

router.post("/forgetpassword", async (req, res) => {
  const useremail = req.body.email;
  console.log(useremail);
  let verifiedEmail = await User.findOne({ where: { email: useremail } });
  // console.log(verifiedEmail)
  if (!verifiedEmail) {
    return res.json({
      error: "Email Not Found In Our DataBase Record",
      code: 401,
    });
  }
  const { id, password, email, name } = verifiedEmail;
  const payload = {
    id,
    email,
  };
  console.log(verifiedEmail);

  const secret = privatekey + password;

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  const link = `http://localhost:3000/reset-password/${id}/${token}`;
  console.log(token);
  // console.log(verifiedEmail)
  sendEmail(email, token, link, name);
  res
    .json({ msg: "We have Sent You Email Please Check It Out!", code: 200 })
    .status(200);
});

router.get("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;

  let verifiedEmail = await User.findOne({ where: { id: id } });
  const { password, email, name } = verifiedEmail;

  const secret = privatekey + password;

  try {
    const payload = jwt.verify(token, secret);
    res.send({ email, name });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  const { userpassword, confirmPassword } = req.body;
  const user = await User.findOne({ where: { id: id } });
  console.log(user.password);
  console.log(userpassword, confirmPassword);
  if (userpassword !== confirmPassword) {
    return res.json({ msg: "Password Does not Match" });
  }

  const secret = privatekey + user.password;

  try {
    const payload = jwt.verify(token, secret);
    const salt = await bcrypt.genSaltSync(10, "a");
    console.log(payload);
    if (payload !== undefined) {
      await User.update(
        {
          password: bcrypt.hashSync(userpassword, salt),
        },
        {
          where: {
            email: payload.email,
          },
        }
      );
      res.send("password change succesfully");
      console.log(user.password);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/dashboard", auth, async (req, res) => {
  let cnic = (req.id = req.user);
  console.log(cnic);

  const singleuser = await User.findOne({
    include: Profile,
    where: {
      id: cnic.id,
    },
  });

  res.json({ Message: "Verified", singleuser });
});

router.get("/userprofile", auth, async (req, res) => {
  let cnic = (req.id = req.user);
  console.log(cnic);

  const users = await User.findOne({
    include: [{ model: Profile },
    { model: ApplicationsImage }],
    where: { id: cnic.id },
  });

  res.json(users);
});


router.get("/allAdmin",async(req,res)=>{
  const admins=await User.findAll({where:{role:['admin',"hod","library","superadmin"]}})
  res.json(admins)
})

router.post("/createAdmin",async(req,res)=>{
  let user=req?.body
  console.log("USER",user)
  try {
    const {data } = await axios.post("http://localhost:3001/register",user, {
      // headers: {
      //   Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
      // },
    });
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
