const express = require("express");


const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const { userApplicationController, allApplication, singleApplication } = require("../controllers/userApplicationController");

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb("Not Supported Format.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, `verification-${Date.now()}.${file.mimetype.split("/")[1]}`);
//     // console.log(file.mimetype);
//   },
// });

// var uploadFile = multer({
//   storage: storage,
//   fileFilter: imageFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// }); uploadFile.any("file")

router.post("/application",auth ,userApplicationController);
router.get("/allApplications",auth,allApplication)
router.get("/application/:applicationId",auth,singleApplication)

module.exports = router;
