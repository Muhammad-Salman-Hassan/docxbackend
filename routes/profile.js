const express = require("express");
const { profileController } = require("../controllers/profilecontroller");

const router = express.Router();
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: "docxbackend/uploads",
  filename: (req, file, cb) => {
    cb(null, `verification-${Date.now()}.${file.mimetype.split("/")[1]}`);
    console.log(file.mimetype)
  },
  
});

var uploadFile = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});


router.post("/profile", uploadFile.any("image"), profileController);

module.exports = router;
