import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export async function getAuthUser(req, res, next) {
  if (!req.cookies.token) {
    console.log("NullllllllllllLLŁ")
    req.user = null
    return next()
  }

  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },
      include: {
        videos: true
      }
    })

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
  }
}

export async function protect(req, res, next) {
  console.log(req.cookies.token)
  if (!req.cookies.token) {
    return next({
      message: "You need to be logled in berfore you can visit! in protect",
      statusCode: 401

    })
  }

  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },
    })

    req.user = user
    next();
  } catch (error) {
    next({
      message: "You have to be logged in ::: " + req.cookies.token + error,
      statusCode: 401,

    })
  }
}