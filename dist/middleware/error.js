"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMiddleware = errorMiddleware;
exports.setupCloseOnExit = setupCloseOnExit;

var _loglevel = _interopRequireDefault(require("loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middleware that will help us catch generic express-related errors
function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    _loglevel.default.error(error);

    res.status(error.statusCode || 500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === "production" ? null : {
        stack: error.stack
      })
    });
  }
} // This closes the server in the event of an error so
// that our requests do not hang


function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server.close().then(() => {
      _loglevel.default.info("Server successfully closed");
    }).catch(error => {
      _loglevel.default.warn("Something went wrong closing the server", error.stack);
    });
    if (options.exit) process.exit();
  } // Do something when app is closing


  process.on("exit", exitHandler); // Catches ctrl+c event

  process.on("SIGINT", exitHandler.bind(null, {
    exit: true
  })); // Catches "kill pid" (for example: nodemon restart)

  process.on("SIGUSR1", exitHandler.bind(null, {
    exit: true
  }));
  process.on("SIGUSR2", exitHandler.bind(null, {
    exit: true
  })); // Catches uncaught exceptions

  process.on("uncaughtException", exitHandler.bind(null, {
    exit: true
  }));
}