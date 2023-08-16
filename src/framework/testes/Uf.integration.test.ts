import server from '../../server'
import request from "supertest";

beforeAll(done => {
  done()
})

afterAll(done => {
  server.close();
  done()
})

describe('POST /uf', () => {
  it('Deve criar uma UF com sucesso', async () => {
    const ufData = {
      sigla: 'PB',
      nome: 'PARAÍBA',
      status: 1
    };

    const response = await request(server)
      .post('/uf')
      .send(ufData);

    expect(response.status).toBe(200);
  });
})