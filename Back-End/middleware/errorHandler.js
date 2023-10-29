const { logEvents } = require("./logger"); //importing the helper function

//creating error handler
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //return status code or 500 i.e server error

  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
