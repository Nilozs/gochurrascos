import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../logger/logger"
import { generateToken } from "../utils/jwt"

const prisma = new PrismaClient()

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError("Email and password are required")
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ValidationError("Invalid email or password")
    }

    const token = generateToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}
