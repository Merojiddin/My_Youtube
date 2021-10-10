"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthRoutes = getAuthRoutes;

var _express = _interopRequireWildcard(require("express"));

var _client = require("@prisma/client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// A function to get the routes.
// All route definitions are in one place and we only need to export one thing
const prisma = new _client.PrismaClient();

function getAuthRoutes() {
  const router = _express.default.Router();

  router.post('/google-login', googleLogin);
  return router;
} // All controllers/utility functions here


async function googleLogin(req, res) {
  const {
    username,
    email
  } = req.body;
  let user; // let user = await prisma.user.findUnique({
  //   where: {
  //     email: email
  //   }
  // })

  if (!user) {
    user = await prisma.user.create({
      data: {
        username,
        email
      }
    });
  }

  const tokenPlayload = {
    id: user.id
  };

  const token = _jsonwebtoken.default.sign(tokenPlayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.cookie("Token", token);
  res.status(200).send(token);
}

async function me(req, res) {}

function signout(req, res) {}