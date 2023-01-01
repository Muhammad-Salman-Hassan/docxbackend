const fs = require("fs");
const db = require("../models");

const Profile = db.userProfile;

const uploadFiles = async (req, res) => {
  let rollno = req.body.rollno;
  let fathername = req.body.fathername;
  let fullname = req.body.fullname;
  let department = req.body.department;
  let passingyear = req.body.passingyear;
  let enrolmentno = req.body.enrolmentno;
  let libraryid = req.body.libraryid;
  let profilepic = req.file;

  try {
    console.log(profilepic);

    if (profilepic == undefined) {
      return res.send(`You must select a file.`);
    }

    let fileread = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );
    let obj = {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      profilepic: fileread,
    };
    Profile.create(obj).then((response) => {
      return res.send(`Profile Created SuccesFully.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
