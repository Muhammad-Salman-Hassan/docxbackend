const express = require("express");


const router = express.Router();
const multer = require("multer");
const auth=require("../middleware/auth")
const { userApplicationController, allApplication, singleApplication, updateApplication, updateStatus,GetStatus } = require("../controllers/userApplicationController");
const { verifyDocumentAccess } = require("../middleware/RolesMarking");


router.post("/application",auth ,userApplicationController);
router.get("/allApplications",auth,allApplication)
router.get("/application/:applicationId",auth,singleApplication)
router.put("/updateApplication/:applicationId",auth,updateApplication)
router.get("/status",auth,GetStatus)
router.put("/updateStatus",verifyDocumentAccess,updateStatus)

module.exports = router;
