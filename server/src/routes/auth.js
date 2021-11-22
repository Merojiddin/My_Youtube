import express, { response } from "express";
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authorization";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// A function to get the routes.
// All route definitions are in one place and we only need to export one thing

const prisma = new PrismaClient()
function getAuthRoutes() {
  const router = express.Router();

  router.post('/google-login', googleLogin)
  router.get('/me', protect, me)
  router.get('/signout', signout)


  return router;
}

// All controllers/utility functions here
async function googleLogin(req, res) {
  const { idToken } = req.body
  console.log("Google login requested")
  console.log(client, client.verifyIdToken);
  console.log("req.body: " + req.body)
  console.log(process.env.GOOGLE_CLIENT_ID);

  try {
    console.log("Trying")
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    console.log("Ticket: inside" + ticket)
    console.log("Ticket inside after ")
  } catch (error) {
    console.log(error)
  }

  console.log("Ticket: Outside" + ticket)
  console.log("Ticket after Outside")




  const { name, picture, email } = ticket.getPayload();

  let user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    console.log("New user created")
    user = await prisma.user.create({
      data: {
        email,
        username: name,
        avatar: picture
      }
    })
  }

  const tokenPlayload = { id: user.id }
  const token = jwt.sign(tokenPlayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
  console.log(token)
  res.cookie("token", token, { httpOnly: true })
  res.status(200).send(token)
}

async function me(req, res) {
  const subscribtions = await prisma.subscription.findMany({
    where: {
      subscriberId: {
        equals: req.user.id
      }
    }
  })
  const channelIds = subscribtions.map(sub => sub.subscribedToId)
  const channels = await prisma.user.findMany({
    where: {
      id: {
        in: channelIds,
      },

    }
  })

  const user = req.user;
  user.channels = channels

  res.status(200).json({ user });
}

function signout(req, res) {
  res.clearCookie('token')
  res.status(200).json({})
}

export { getAuthRoutes };