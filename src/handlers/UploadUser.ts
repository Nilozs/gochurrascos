import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { NotFoundError, ValidationError, updateError } from "../logger/logger"
import { sendSucess } from "./response"

const prisma = new PrismaClient()

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { email, password, name, phone } = req.body

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 20) },
    })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    const updateData: any = {
      email,
      name,
      phone,
    }

    if (password) {
      const saltRounds = 10
      updateData.password = await bcrypt.hash(password, saltRounds)
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 20) },
      data: updateData,
    })

    sendSucess(res, updatedUser, "usuario atualizado com sucesso")
  } catch (error) {
    throw new updateError("erro ao atualizar o usuario")
  }
}
