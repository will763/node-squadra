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
const UfService_1 = __importDefault(require("../uf/UfService"));
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const retornarArrayObjetos_1 = require("../utils/retornarArrayObjetos");
const MunicipioDAO_1 = require("./MunicipioDAO");
class MunicipioService {
    constructor() {
        this.municipioDAO = new MunicipioDAO_1.MunicipioDAO();
        this.ufService = new UfService_1.default();
    }
    listarMunicipioDinamicamente(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigoMunicipio, codigoUF, nome, status } = parametros;
            const formatacao = ['codigoMunicipio', 'codigoUF', 'nome', 'status'];
            if (codigoMunicipio) {
                const resultado = yield this.municipioDAO.listar({ codigoMunicipio, codigoUF, nome, status });
                return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao)[0] : [];
            }
            const resultado = yield this.municipioDAO.listar({ codigoMunicipio, codigoUF, nome, status });
            return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao) : [];
        });
    }
    criarDepoisListarTodos({ codigoUF, nome, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ufService.existeCodigoUF(codigoUF);
            yield this.existeMunicipioEmUf(nome, codigoUF);
            yield this.municipioDAO.criar({ codigoUF, nome, status });
            const resultado = yield this.municipioDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoMunicipio', 'codigoUF', 'nome', 'status']);
        });
    }
    atualizarDepoisListarTodos(codigoMunicipio, codigoUF, nome, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.existeCodigoMunicipio(codigoMunicipio);
            yield this.ufService.existeCodigoUF(codigoUF);
            yield this.existeMunicipioEmUf(nome, codigoUF, codigoMunicipio);
            yield this.municipioDAO.atualizar({ codigoMunicipio, codigoUF, nome, status });
            const resultado = yield this.municipioDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoMunicipio', 'codigoUF', 'nome', 'status']);
        });
    }
    deletar(codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.municipioDAO.deletar(codigoMunicipio);
        });
    }
    existeMunicipioEmUf(nome, codigoUF, codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeMunicipioEmUf = yield this.municipioDAO.existeMunicipioEmUf(nome, codigoUF, codigoMunicipio);
            if (existeMunicipioEmUf) {
                throw new AppError_1.default(`Já existe um municipio com o mesmo nome nesse UF, por favor, insira um complemento.`, 400);
            }
        });
    }
    existeCodigoMunicipio(codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeCodigoMunicipio = yield this.municipioDAO.existePorcodigoMunicipio(codigoMunicipio);
            if (!existeCodigoMunicipio) {
                throw new AppError_1.default(`O codigoMunicipio ${codigoMunicipio} não existe.`, 400);
            }
        });
    }
}
exports.default = MunicipioService;
