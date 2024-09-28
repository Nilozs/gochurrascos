import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { NotFoundError, ValidationError } from "../logger/logger"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (isNaN(parseInt(id))) {
      throw new ValidationError("ID inválido fornecido")
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        enderecos: true,
      },
    })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    sendSucess(res, user, "Usuário encontrado com sucesso")
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar usuário" })
  }
}
