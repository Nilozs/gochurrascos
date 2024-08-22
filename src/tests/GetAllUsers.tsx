import request from 'supertest';
import { app } from '../index';

describe('GET /api/users', () => {
  it('deve retornar uma lista de usuários', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);  
  });
});
