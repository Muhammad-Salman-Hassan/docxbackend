const fs = require("fs");
const db = require("../models");
var multer  = require('multer');
const path = require("path");
const Profile = db.userProfile;



const profileController = async (req, res) => {
  let rollno = req.body.rollno;
  let fathername = req.body.fathername;
  let fullname = req.body.fullname;
  let department = req.body.department;
  let passingyear = req.body.passingyear;
  let enrolmentno = req.body.enrolmentno;
  let libraryid = req.body.libraryid;
  let profilepic = req.files;
  global.__basedir = __dirname;
  try {
   
    let [filename]=profilepic
    console.log(__dirname);
    if (profilepic == undefined) {
      return res.send(`You must select a file.`);
    }
    
    
    let fileread = fs.readFileSync(
       "docxbackend/uploads/"+filename.filename
    );
    // let write=fs.writeFileSync(
    //   "docxbackend/uploads/"+filename.name,
    //   fileread.data
    // );

    // console.log(write)
    let obj = {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      profilepic:fileread,
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
  profileController,
};
