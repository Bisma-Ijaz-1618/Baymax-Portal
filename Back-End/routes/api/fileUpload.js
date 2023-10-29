const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const fileUtility = require("../../utility/fileHandler");
const FILE_EXTENSION_LIST = require("../../config/file_extension_list");

router.route("/").post(
  fileUpload({ createParentPath: true }), //creates parent directory if it doesnt exist
  fileUtility.filesPayloadExists, //checks if filepayload is there
  fileUtility.fileExtLimiter(FILE_EXTENSION_LIST), //checks if files are of allowed extensions
  fileUtility.fileSizeLimiter, //checks if file is within the size limit
  fileUtility.handleFileUpload
);

module.exports = router;
