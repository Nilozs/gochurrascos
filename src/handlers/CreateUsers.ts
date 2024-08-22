import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { ValidationError } from "../logger/logger"
import { generateToken } from "../utils/jwt"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body

    if (!email || !password || !name || !phone) {
      throw new ValidationError("Erro de validação: veja os campos requeridos")
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
      },
    })

    const token = generateToken(newUser.id)

    sendSucess(res, { user: newUser, token }, "Usuário criado com sucesso")
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
}
