import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET as string

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "30h" })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error("Token invalido")
  }
}
