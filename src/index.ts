import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser"
import compression from "compression"
import express, { NextFunction, Request, Response } from "express"
import { createUser } from "./handlers/CreateUsers"
import { deleteUserById } from "./handlers/DeleteUser"
import { listUsers } from "./handlers/GetAllUsers"
import { getUserById } from "./handlers/GetUsersById"
import { loginUser } from "./handlers/LoginUser"
import { updateUserById } from "./handlers/UploadUser"
import { errorHandler } from "./middleware/midleware"

// Instância do Prisma
const prisma = new PrismaClient()
export const app = express()

// Ajuste da tipagem para garantir que o 'next' seja sempre obrigatório
type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void

const allowCors =
  (fn: HandlerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Origin", "*") // Ajuste aqui se quiser permitir origens específicas
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    )
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    )
    if (req.method === "OPTIONS") {
      res.status(200).end()
      return
    }
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }

// Configurações globais do express
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Middleware de tratamento de erros
app.use(errorHandler)

// Rota de teste
app.get("/api", (req: Request, res: Response) => {
  res.send("API Funcionando")
})

// Handlers de usuários, agora usando `allowCors`
app.post("/api/create-users", allowCors(createUser))
app.get("/api/user/:id", allowCors(getUserById))
app.delete("/api/user/:id", allowCors(deleteUserById))
app.put("/api/user/:id", allowCors(updateUserById))
app.post("/api/login", allowCors(loginUser))
app.get("/api/users", allowCors(listUsers))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/api`)
})
