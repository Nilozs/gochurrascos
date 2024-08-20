import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { NotFoundError, ValidationError, deleteError } from "../logger/logger"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    })

    if (!user) {
      throw new NotFoundError("usuario não encontrado")
    }

    await prisma.user.delete({
      where: { id: parseInt(id, 20) },
    })

    sendSucess(res, user, "usuario deletado com sucesso")
  } catch (error) {
    throw new deleteError("erro ao deletar o usuario")
  }
}
