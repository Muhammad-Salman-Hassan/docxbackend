const fs = require("fs");
const db = require("../models");

const Profile=db.userProfile

const uploadFiles = async (req, res) => {
    let rollno=req.body.rollno
    let fathername=req.body.fathername
    let fullname=req.body.fullname
    let department=req.body.department
    let passingyear=req.body.passingyear
    let enrolmentno=req.body.enrolmentno
    let libraryid=req.body.libraryid
    let profilepic=req.file


  try {
    console.log(profilepic);

    if (profilepic == undefined) {
      return res.send(`You must select a file.`);
    }

    let obj={
        fullname,
        department,
        passingyear,
        enrolmentno,
        libraryid,
        profilepic:fs.readFileSync(
            __basedir + "/resources/static/assets/uploads/" + req.file.filename
          ),
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};