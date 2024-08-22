import request from "supertest"
import { app } from "../index"

describe("API Endpoints", () => {
  it("deverá retornar mensagem de sucesso", async () => {
    const response = await request(app).get("/api")
    expect(response.status).toBe(200)
    expect(response.text).toBe("API Funcionando") 
  })
})
