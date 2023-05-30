const express = require("express");
const { applicationImages } = require("../controllers/imageUploadController");
const {uploadImage } = require("../services/DefaultFunction");
const auth = require("../middleware/auth");


const router = express.Router();
router.post("/applicationImage", uploadImage().array("files", 10) ,auth,applicationImages);

module.exports = router;
