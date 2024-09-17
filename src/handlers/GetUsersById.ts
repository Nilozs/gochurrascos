import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { NotFoundError, ValidationError } from "../logger/logger"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 30) },
      include: {
        enderecos: true,
      },
    })

    if (!user) {
      throw new NotFoundError("usuario não encontrado")
    }

    sendSucess(res, user, "usuario encontrado com sucesso")
  } catch (error) {
    throw new NotFoundError("usuario não encontrado verifique o id")
  }
}
