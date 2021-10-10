"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = require("./auth");

var _user = require("./user");

var _video = require("./video");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  // All routes in our Node API are placed on this router
  const router = _express.default.Router(); // router.use() prefixes our route (i.e. /api/v1/auth)


  router.use("/auth", (0, _auth.getAuthRoutes)());
  router.use("/users", (0, _user.getUserRoutes)());
  router.use("/videos", (0, _video.getVideoRoutes)());
  return router;
}