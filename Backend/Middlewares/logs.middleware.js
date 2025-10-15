const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const logStream = fs.createWriteStream(path.join("logs", "access.log"), { flags: "a" });

const logger = morgan(
   ":method :url :status :res[content-length] - :response-time :remote-addr ms ",
  { stream: logStream }
);

module.exports = logger;