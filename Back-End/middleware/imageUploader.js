const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    console.log("here in uploads");
  },
  filename: function (req, file, cb) {
    const userId = req.userId; // Assuming you have user ID in req object
    cb(null, userId + "-" + Date.now() + "-" + file.originalname);
    console.log("here in filename");
  },
});

const upload = multer({ storage: storage });

const imageUploader = (req, res, next) => {
  console.log("in image uplaoder");
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("mut err", err);
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      console.log(err);
      return res.status(500).send("Internal server error: " + err.message);
    }
    // Proceed to the next middleware function
    console.log("in image uplaoder2");
    next();
  });
};

module.exports = imageUploader;
