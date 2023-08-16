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
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const retornarArrayObjetos_1 = require("../utils/retornarArrayObjetos");
const UfDAO_1 = require("./UfDAO");
class UfService {
    constructor() {
        this.ufDAO = new UfDAO_1.UfDAO();
    }
    criarDepoisListarTodos(sigla, nome, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.existeUfNome(nome);
            yield this.existeUfSigla(sigla);
            yield this.ufDAO.criar({ sigla, nome, status });
            const resultado = yield this.ufDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoUF', 'sigla', 'nome', 'status']);
        });
    }
    atualizarDepoisListarTodos(codigoUF, sigla, nome, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.existeCodigoUF(codigoUF);
            yield this.existeUfNome(nome, codigoUF);
            yield this.existeUfSigla(sigla, codigoUF);
            yield this.ufDAO.atualizar({ codigoUF, sigla, nome, status });
            const resultado = yield this.ufDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoUF', 'sigla', 'nome', 'status']);
        });
    }
    deletar(codigoUf) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ufDAO.deletar(codigoUf);
        });
    }
    listarUfDinamicamente(codigoUF, sigla, nome, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const retornaTudo = !codigoUF && !sigla && !nome && !status;
            const somenteStatus = !codigoUF && !sigla && !nome && status;
            const formatacao = ['codigoUF', 'sigla', 'nome', 'status'];
            if (retornaTudo || somenteStatus) {
                const resultado = yield this.ufDAO.listar({ codigoUF, sigla, nome, status });
                return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao) : [];
            }
            const resultado = yield this.ufDAO.listar({ codigoUF, sigla, nome, status });
            return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao)[0] : [];
        });
    }
    existeUfSigla(sigla, codigoUf) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeSigla = yield this.ufDAO.existeUfPorSigla(sigla, codigoUf);
            if (existeSigla) {
                throw new AppError_1.default(`A sigla ${sigla} já esta sendo usada`, 400);
            }
        });
    }
    existeUfNome(nome, codigoUf) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeNome = yield this.ufDAO.existeUfPorNome(nome, codigoUf);
            if (existeNome) {
                throw new AppError_1.default(`Parece que você esta tentando usar o nome ${nome}, mas esse nome já esta sendo usado.`, 400);
            }
        });
    }
    existeCodigoUF(codigoUF) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeCodigoUF = yield this.ufDAO.existeUfPorcodigoUF(codigoUF);
            if (!existeCodigoUF) {
                throw new AppError_1.default(`O codigoUF ${codigoUF} não existe.`, 400);
            }
        });
    }
}
exports.default = UfService;
