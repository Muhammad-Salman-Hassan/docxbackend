const fs = require("fs");
const db = require("../models");
const { default: axios } = require("axios");
const { generateUnique4DigitId, generateRandomNumber } = require("../services/DefaultFunction");
const statusEmail = require("../services/StatusEmail");
const ApplicationsImage=db.ApplicationsImage

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
      applicationStatus: 0,
      applicationId: id,
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
    let applications = await UserApplication.findAll({
      include:ApplicationsImage
    });
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

const updateApplication = async (req, res) => {
  try {
    let application = req.body
    UserApplication.update(application, { where: { applicationId: req.params.applicationId } }).then((response) => {
      return res.send(`Application Updated. ${response}`);
    });

  } catch (error) {
    console.log(error)
  }
}

const updateStatus = async (req, res) => {
  try {
    let applicationId = req.body.applicationId
    let applicationStatus = req.body.applicationStatus

    console.log("update status", applicationId, applicationStatus)
    let response = await UserApplication.update({ applicationStatus: applicationStatus ,reciptNumber:applicationStatus===1?generateRandomNumber(10):null}, { where: { applicationId } })
    if (response[0] === 1) {
      const { data } = await axios.get("http://localhost:3001/dashboard", {
        headers: {
          Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
        },

      });
      let name=data?.singleuser?.name
      let email=data?.singleuser?.email
      let status=applicationStatus
      statusEmail(email,status,email)
      
      console.log(data.singleuser.email,data?.singleuser?.name, "user Response")
    }
    res.json({message:"Email is Bieng Send To User !"})
    console.log(response, "response")
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  userApplicationController,
  allApplication,
  singleApplication,
  updateApplication,
  updateStatus
};