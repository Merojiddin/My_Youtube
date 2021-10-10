"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _routes = require("./routes");

var _error = require("./middleware/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import this module to handle errors when using async functions for our route handlers
_dotenv.default.config();

function startServer({
  port = process.env.PORT
} = {}) {
  const app = (0, _express.default)();
  app.use((0, _morgan.default)("dev"));
  app.use((0, _cors.default)());
  app.use((0, _cookieParser.default)());
  app.use(_express.default.json()); // all API routes are prefixed with /api/v1

  app.use("/api/v1", (0, _routes.getRoutes)()); // Generic error handler if errors are missed by 'express-async-errors' middleware

  app.use(_error.errorMiddleware); // When our project is pushed to production, we will serve // the react app using express.static() middleware

  if (process.env.NODE_ENV === "production") {
    app.use(_express.default.static(_path.default.resolve(__dirname, "../client/build"))); // Any request not caught by our API will be routed
    // to our built react app

    app.get("*", function (req, res) {
      res.sendFile(_path.default.resolve(__dirname, "../client/build", "index.html"));
    });
  } // This block of code is made to reliably start and close our express app
  // It is written as a promise, which can be more easily tested


  return new Promise(resolve => {
    const server = app.listen(port, () => {
      _loglevel.default.info(`Listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);

      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      }; // This function properly closes the server when the program exits


      (0, _error.setupCloseOnExit)(server);
      resolve(server);
    });
  });
}