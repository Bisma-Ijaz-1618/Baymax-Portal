const path = require("path");
const crypto = require("crypto");
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});

const randomImageName = (bytes = 32) => {
  return crypto.randomBytes(32).toString("hex");
};

const handleFileUpload = async (req, res) => {
  const files = req.files;
  console.log(files);

  let uploadPromises = [];
  let fetchPromises = [];
  for (const key of Object.keys(files)) {
    console.log("buffer of ", key, "=", files[key].data);
    // aws command to store image

    const imageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: files[key].data,
      ContentType: files[key].mimetype,
    };
    console.log(params);
    const command = new PutObjectCommand(params);
    const fetchUrl = new GetObjectCommand(params);

    uploadPromises.push(s3.send(command));
    fetchPromises.push(getSignedUrl(s3, fetchUrl, { expiresIn: 36000 }));

    // Storing in the database - this should be done inside the promise, not here.
    const filepath = path.join(__dirname, "..", "files", files[key].name);
    files[key].mv(filepath, (err) => {
      // moves file to destination
      if (err) {
        // Handle errors properly
        return res.status(422).json({
          status: "error:",
          message: "There was an error in processing files. Please try again!",
        });
      }
    });
  }

  const uploads = await Promise.all(uploadPromises);
  const urls = await Promise.all(fetchPromises);
  console.log("uploads", uploads);
  console.log(urls);
  return res.status(200).json({
    status: "success:",
    message: Object.keys(files).toString(),
    urls,
  });
};

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`;
      console.log("err msg", message);
      return res.status(422).json({ status: "error:", message });
    }

    next();
  };
};

const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
  const files = req.files;

  const filesOverLimit = [];
  // Which files are over the limit?
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const message = `Upload failed. Following files are over the limit of 5 MB:  ${filesOverLimit.toString()}`;
    return res.status(413).json({ status: "error:", message });
  }

  next();
};

const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    //if there are no files
    return res.status(400).json({ status: "error:", message: "Missing files" });

  next();
};

module.exports = {
  handleFileUpload,
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
};
