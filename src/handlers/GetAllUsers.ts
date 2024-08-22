import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    sendSucess(res, users, "Usuarios listado com sucesso")
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários" })
  }
}
