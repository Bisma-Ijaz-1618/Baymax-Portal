//23
//jwt tokens
//middleware
//authorized vs unauthorized
require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { log } = require("console");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const credentials = require("./middleware/credentials");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//setting a port
const PORT = process.env.PORT || 3000;

//connect to Mongodb
connectDB();

//use logger
app.use(logger);

//allow credentials for cors
app.use(credentials);
//available to public
app.use(cors(corsOptions));

//processing json to recieve and parse json data make it available as req.body within the corresponding route handler
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//midleware that servers static files
app.use(express.static(path.join(__dirname, "public")));
//for given url path use the route specified in require
app.use(require("./routes"));

//handling anything thats not found//routing
app.all("*", (req, res) => {
  res.status(404); //we have to set it as we know page doesnt exist
  if (req.accepts("html")) {
    //if req has accepts header that is html
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    //if there is a json request that wasnt routed properly and didnt get stopped by expected routes
    res.json({ message: "404 Not Found" });
  } else {
    //sent if html or json were not matched in accepts header
    res.type("txt").send("404 Not Found");
  }
});

//using error handler middleware
app.use(errorHandler);

//try connecting to mongo before listening for requests
mongoose.connection.once("open", () => {
  console.log("Connected to mongo DB");

  //listening on port after connecting to db
  var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server running... \nApp listening at http://${host}:${port}`);
  });
});
