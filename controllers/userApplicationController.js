const fs = require("fs");
const db = require("../models");
const { default: axios } = require("axios");
const { generateUnique4DigitId, generateRandomNumber } = require("../services/DefaultFunction");
const statusEmail = require("../services/StatusEmail");
const ApplicationsImage = db.ApplicationsImage

const UserApplication = db.userApplication;
let port = 3001;

const userApplicationController = async (req, res) => {
  console.log("USER Request", req.Cookie);
  let id = generateUnique4DigitId(); //4 digit unique id
  let user_id = (req.id = req.user)
  let app_id = user_id.id
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

    console.log("USERDATA", userData)
    let obj = {
      applicationStatus: 0,
      applicationId: id,
      application_id: app_id,
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone,
      cnic: userData.cnic
    };

    console.log("OBJECT", obj)
    await UserApplication.create(obj).then((response) => {
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

    });
    res.json(applications);
  } catch (error) {
    console.log(error);
  }
};

const singleApplication = async (req, res) => {
  try {
    let applicationId = req.params.applicationId;
    console.log(applicationId, "APPLICATIONID")
    let singleApplications = await UserApplication.findOne({
      where: { applicationId },
    });

    // console.log("SINGLE USER CNIC",singleApplications)
    const userResponse = await axios.get(`http://localhost:3001/userprofile/${singleApplications?.cnic}`, {
      headers: {
        Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
      },
    });
    res.json({ ...singleApplications.dataValues, ...userResponse.data });
    console.log("userREsponse", userResponse)
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

const GetStatus = async (req, res) => {
  try {
    let cnic = (req.cnic = req.user);
    console.log(req.user,"CNIC");
    const status = await UserApplication.findOne({

      where: { cnic: cnic.usercnic },
    });
    console.log("status", status)
    res.json(status)


  } catch (error) {
    console.log(error)
  }
}

const updateStatus = async (req, res) => {
  try {
    let applicationId = req.body.applicationId
    let applicationStatus = req.body.applicationStatus

    console.log("update status", applicationId, applicationStatus)
    let response = await UserApplication.update({ applicationStatus: applicationStatus.toString(), reciptNumber: applicationStatus === 1 ? generateRandomNumber(10) : null }, { where: { applicationId } })
    if (response[0] === 1) {
      const { data } = await axios.get("http://localhost:3001/dashboard", {
        headers: {
          Cookie: `accessToken=${req.cookies.accessToken}`, // Add any required headers here
        },

      });
      let name = data?.singleuser?.name
      let email = data?.singleuser?.email
      let status = applicationStatus
      statusEmail(email, status, email)

      console.log(data.singleuser.email, data?.singleuser?.name, "user Response")
    }
    res.json({ message: "Email is Being Send To User !" })
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
  updateStatus,
  GetStatus
};
