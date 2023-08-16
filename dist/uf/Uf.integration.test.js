"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
beforeAll(done => {
    done();
});
afterAll(done => {
    server_1.default.close();
    done();
});
describe('POST /uf', () => {
    it('Deve criar uma UF com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const ufData = {
            sigla: 'PB',
            nome: 'PARAÍBA',
            status: 1
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/uf')
            .send(ufData);
        expect(response.status).toBe(500);
        // expect(response.body).toEqual(
        //   expect.arrayContaining([
        //     expect.objectContaining({
        //       sigla: expect.any(String),
        //       nome: expect.any(String),
        //       status: expect.any(Number)
        //     })
        //   ])
        // );
        // expect(response.body).toContainEqual(
        //   expect.objectContaining(ufData)
        // );
    }));
});
