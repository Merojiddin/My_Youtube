"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRoutes = getUserRoutes;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserRoutes() {
  const router = _express.default.Router();

  return router;
}

async function getLikedVideos(req, res, next) {}

async function getHistory(req, res, next) {}

async function toggleSubscribe(req, res, next) {}

async function getFeed(req, res) {}

async function searchUser(req, res, next) {}

async function getRecommendedChannels(req, res) {}

async function getProfile(req, res, next) {}

async function editUser(req, res) {}