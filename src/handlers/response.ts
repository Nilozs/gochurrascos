import { Request, Response } from "express"

export const sendSucess = (
  res: Response,
  data: any,
  message: string = "Sucesso",
) => {
  res.status(200).json({
    success: true,
    message,
    data,
  })
}

