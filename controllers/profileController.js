const fs = require("fs");
const db = require("../models");
var multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = db.user;
const Profile = db.userProfile;
let port=3001

const profileController = async (req, res) => {
  
 

  let rollno = req.body.rollno;
  let fathername = req.body.fathername;
  let fullname = req.body.fullname;
  let department = req.body.department;
  let passingyear = req.body.passingyear;
  let enrolmentno = req.body.enrolmentno;
  let libraryid = req.body.libraryid;
  let phone= req.body.phone;
  let profilepic = req.files;
  let obj_id=(req.id = req.user)
  let user_id=obj_id.id
  console.log(profilepic,user_id)
  global.__basedir = __dirname;
  try {
    let [filename] = profilepic;
  
    if (profilepic == undefined) {
      return res.send(`You must select a file.`);
    }

    let fileread = fs.readFileSync("uploads/" + filename.filename);
    // let write=fs.writeFileSync(
    //   "docxbackend/uploads/"+filename.name,
    //   fileread.data
    // );

    // console.log(write) location+url+filename

    const host = req.hostname;
    const filePath = req.protocol + "://" + host+":"+port + "/" + filename.destination+"/"+filename.filename;
   
    let obj = {
      fullname,
      fathername,
      rollno,
      department,
      passingyear,
      enrolmentno,
      libraryid,
      phone,
      profilepic: fileread,
      imgname:filename.filename,
      imgdestination:filename.destination,
      user_id,
      imgurl:filePath
    };
    await Profile.create(obj).then((response) => {
      return res.send(`Profile Created SuccesFully.`);
    });
  } catch (error) {
    console.log(error);
    return res.json({msg:"Error when trying to complete your Profile",error});
  }
};
const getImages=async(req,res)=>{
  let cnic = (req.id = req.user);
  console.log(cnic);

  const users = await User.findOne({
    include: db.ApplicationsImage,
    where: { id: cnic.id },
  });

  res.json(users);
}

module.exports = {
  profileController,
  getImages
};
