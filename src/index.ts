import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser"
import compression from "compression"
import cors from "cors"
import express, { Request, Response } from "express"
import { createUser } from "./handlers/CreateUsers"
import { deleteUserById } from "./handlers/DeleteUser"
import { getUserById } from "./handlers/GetUsersById"
import { loginUser } from "./handlers/LoginUser"
import { updateUserById } from "./handlers/UploadUser"
import { errorHandler } from "./middleware/midleware"

const prisma = new PrismaClient()
export const app = express()

const allowedOrigins = ["http://localhost:8080", "http://localhost:3000"] 
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("não permitido pelo cors"))
      }
    },
    credentials: true,
  }),
)

app.use(express.json())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(errorHandler)

app.get("/api", (req: Request, res: Response) => {
  res.send("API Funcionando")
})

// handler dos usuarios
app.post("/api/create-users", createUser)
app.get("/api/user/:id", getUserById)
app.delete("/api/user/:id", deleteUserById)
app.put("/api/user/:id", updateUserById)
app.post("/api/login", loginUser)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/api`)
})
