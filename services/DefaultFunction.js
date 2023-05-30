const generatedIds = new Set();

function generateUnique4DigitId() {
  let id;
  do {
    id = Math.floor(1000 + Math.random() * 9000).toString();
  } while (generatedIds.has(id));
  
  generatedIds.add(id);
  return id;
}

function generateRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const multer = require("multer");

const uploadImage = () => {
  const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb("Not Supported Format.", false);
    }
  };

  const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(
        null,
        `verification-${Date.now()}.${file.mimetype.split("/")[1]}`
      );
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
  return upload;
};

module.exports={
    generateUnique4DigitId,
    uploadImage,
    generateRandomNumber
}