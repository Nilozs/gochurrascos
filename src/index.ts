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
import { listUsers } from "./handlers/GetAllUsers"

const prisma = new PrismaClient()
export const app = express()

const allowedOrigins = [
  "https://gochurrascos.onrender.com",
  "https://mestre-do-churrasco.vercel.app/",
]
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
app.options('*', cors()); 

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mestre-do-churrasco.vercel.app",
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.use(errorHandler)

app.get("/api", (req: Request, res: Response) => {
  res.send("API Funcionando")
})

// handler dos usuarios
app.post("/api/create-users", createUser , cors())
app.get("/api/user/:id", getUserById , cors())
app.delete("/api/user/:id", deleteUserById , cors())
app.put("/api/user/:id", updateUserById , cors())
app.post("/api/login", loginUser , cors())
app.get("/api/users", listUsers , cors())

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/api`)
})
