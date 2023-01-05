const express = require("express");
const { profileController } = require("../controllers/profilecontroller");

const router = express.Router();

const uploadFile = require("../middleware/UploadMulter");

router.post("/profile", uploadFile.single("file"), profileController);

module.exports = router;


