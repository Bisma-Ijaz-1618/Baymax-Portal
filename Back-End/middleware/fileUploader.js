const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a folder for the user ID if it doesn't exist
    const userId = req.userId;
    const userFolderPath = path.join(__dirname, "files", userId);
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }
    cb(null, userFolderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const fileUploader = (req, res, next) => {
  console.log("in file uplaoder");
  upload.array("files")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("mut err", err);
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      console.log(err);
      return res.status(500).send("Internal server error: " + err.message);
    }
    // Proceed to the next middleware function
    console.log("in file uplaoder");
    next();
  });
};

module.exports = fileUploader;
