const fs = require("fs");
const db = require("../models");
const { default: axios } = require("axios");

const UserApplication = db.userApplication;
let port = 3001;

const userApplicationController = async (req, res) => {
  console.log("USER Request",req.Cookie)
  try {
    // let rollno = req.body.rollno;
    // let fathername = req.body.fathername;
    // let fullname = req.body.fullname;
    // let department = req.body.department;
    // let passingyear = req.body.passingyear;
    // let enrolmentno = req.body.enrolmentno;
    // let libraryid = req.body.libraryid;
    const userResponse = await axios.get("http://localhost:3001/dashboard",{
      headers: {
        Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
      },
    });

    const userData = userResponse.data.singleuser;
    console.log(userData,"salman")
    let {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone
    } = userData.UserProfile;
    let obj = {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone
    };
    UserApplication.create(obj).then((response) => {
      return res.send(`Application Created.`);
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Error when trying to Application Created",
      error,
    });
  }
};

module.exports = {
  userApplicationController,
};
