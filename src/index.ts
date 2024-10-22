import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import { createUser } from "./handlers/CreateUsers";
import { deleteUserById } from "./handlers/DeleteUser";
import { listUsers } from "./handlers/GetAllUsers";
import { getUserById } from "./handlers/GetUsersById";
import { loginUser } from "./handlers/LoginUser";
import { updateUserById } from "./handlers/UploadUser";
import { errorHandler } from "./middleware/midleware";


const prisma = new PrismaClient();
export const app = express();


app.use(express.json());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.use(errorHandler);

app.get("/api", (req: Request, res: Response) => {
  res.send("API Funcionando");
});

app.post("/api/create-users", createUser);
app.get("/api/user/:id", getUserById);
app.delete("/api/user/:id", deleteUserById);
app.put("/api/user/:id", updateUserById);
app.post("/api/login", loginUser);
app.get("/api/users", listUsers);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/api`);
});
