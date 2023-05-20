const fs = require("fs");
const db = require("../models");
const { default: axios } = require("axios");
const { generateUnique4DigitId } = require("../services/DefaultFunction");

const UserApplication = db.userApplication;
let port = 3001;

const userApplicationController = async (req, res) => {
  console.log("USER Request", req.Cookie);
  let id = generateUnique4DigitId(); //4 digit unique id
  try {
    const userResponse = await axios.get("http://localhost:3001/dashboard", {
      headers: {
        Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
      },
    });

    const userData = userResponse.data.singleuser;
    console.log(userData, "salman");
    let {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone,
    } = userData.UserProfile;
    let obj = {
      applicationId,
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone,
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

const allApplication = async (req, res) => {
  try {
    let applications = await UserApplication.findAll();
    res.json(applications);
  } catch (error) {
    console.log(error);
  }
};

const singleApplication = async (req, res) => {
  try {
    let applicationId = req.params.applicationId;
    let singleApplications = await UserApplication.findOne({
      where: { applicationId },
    });
    res.json(singleApplications);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userApplicationController,
  allApplication,
  singleApplication,
};
