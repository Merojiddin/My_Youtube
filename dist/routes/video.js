"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoRoutes = getVideoRoutes;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVideoRoutes() {
  const router = _express.default.Router();

  return router;
}

async function getRecommendedVideos(req, res) {}

async function getTrendingVideos(req, res) {}

async function searchVideos(req, res, next) {}

async function addVideo(req, res) {}

async function addComment(req, res, next) {}

async function deleteComment(req, res) {}

async function addVideoView(req, res, next) {}

async function likeVideo(req, res, next) {}

async function dislikeVideo(req, res, next) {}

async function getVideo(req, res, next) {}

async function deleteVideo(req, res) {}