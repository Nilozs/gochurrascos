import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import express, { Request, Response } from "express"
import { ValidationError } from "../logger/logger"
import { generateToken } from "../utils/jwt"

const prisma = new PrismaClient()
const router = express.Router()

router.post("/login", async (req: Request, res: Response, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ValidationError("email ou senha invalidos")
    }

    const token = generateToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
})

export default router
