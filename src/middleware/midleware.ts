import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AppError, UnauthorizedError } from "../logger/logger"
import { verifyToken } from "../utils/jwt"
''
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error("ocorreu um erro inexperado", error)
  return res.status(500).json({
    status: error,
    message: "Erro interno no servidor",
  })
}

interface IDecode {
  address: string
  role: string
  iat: number
  exp: number
}

interface RequestWithUserRole extends Request {
  user?: IDecode
}

const parseToken =
  (secret: string) =>
  async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1]
      // console.log(req.headers?.authorization);
      if (!token) {
        return res.status(403).json({ message: "Token not  found" })
      }
      const decodedData = <IDecode>jwt.verify(token, secret)
      req.user = decodedData
      // console.log(decodedData);
      return next()
    } catch (e) {
      return res.status(500).json({ e })
    }
  }
