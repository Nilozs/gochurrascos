import request from "supertest"
import { app } from "../index"

describe("POST /api/create-users", () => {
  it("o usuario deve ser criado com sucesso", async () => {
    const response = await request(app).post("/api/create-users").send({
      email: "test@gmail.com", 
      password: "password123",
      name: "Test User",
      phone: "1234567890",
    })

    expect(response.status).toBe(200)
    expect(response.body.user).toHaveProperty("email", "test@exemplo.com") 
  })

  it("deverá retornar um erro de validação", async () => {
    const response = await request(app).post("/api/create-users").send({
      email: "test@gmail.com",
      name: "Test User",
      phone: "1234567890",
    })
    expect(response.status).toBe(400)
  })
})
