const { format } = require("date-fns"); //used for date format
const { v4: uuid } = require("uuid"); //gives id to every item logged
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//creating a log event function
const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    ); //provides the path and the item to be logged
  } catch (err) {
    console.log(err);
  }
};

//middleware
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log"); //calling function
  console.log(`${req.method} ${req.path}`);
  next(); //moves to next middleware or controller where req is prcessed
};

module.exports = { logEvents, logger };
