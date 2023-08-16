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
const BairroDAO_1 = require("./BairroDAO");
const MunicipioService_1 = __importDefault(require("../municipio/MunicipioService"));
class BairroService {
    constructor() {
        this.bairroDAO = new BairroDAO_1.BairroDAO();
        this.municipioService = new MunicipioService_1.default();
    }
    listarMunicipioDinamicamente(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigoBairro, codigoMunicipio, nome, status } = parametros;
            const formatacao = ['codigoBairro', 'codigoMunicipio', 'nome', 'status'];
            if (!codigoBairro) {
                const resultado = yield this.bairroDAO.listar({ codigoBairro, codigoMunicipio, nome, status });
                return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao) : [];
            }
            const resultado = yield this.bairroDAO.listar({ codigoBairro, codigoMunicipio, nome, status });
            return resultado.length > 0 ? (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, formatacao)[0] : [];
        });
    }
    criarDepoisListarTodos({ codigoMunicipio, nome, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.municipioService.existeCodigoMunicipio(codigoMunicipio);
            yield this.existeBairroEmMunicipio(nome, codigoMunicipio);
            yield this.bairroDAO.criar({ codigoMunicipio, nome, status });
            const resultado = yield this.bairroDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoBairro', 'codigoMunicipio', 'nome', 'status']);
        });
    }
    atualizarDepoisListarTodos(codigoBairro, codigoMunicipio, nome, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.existePorcodigoBairro(codigoBairro);
            yield this.municipioService.existeCodigoMunicipio(codigoMunicipio);
            yield this.existeBairroEmMunicipio(nome, codigoMunicipio, codigoBairro);
            yield this.bairroDAO.atualizar({ codigoBairro, codigoMunicipio, nome, status });
            const resultado = yield this.bairroDAO.listarTodosRegistros();
            return (0, retornarArrayObjetos_1.retornarArrayObjetos)(resultado, ['codigoBairro', 'codigoMunicipio', 'nome', 'status']);
        });
    }
    deletar(codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bairroDAO.deletar(codigoBairro);
        });
    }
    existeBairroEmMunicipio(nome, codigoMunicipio, codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeBairroEmMunicipio = yield this.bairroDAO.existeBairroEmMunicipio(nome, codigoMunicipio, codigoBairro);
            if (existeBairroEmMunicipio) {
                throw new AppError_1.default(`Já existe um bairro com o mesmo nome nesse municipio, por favor, insira um complemento.`, 400);
            }
        });
    }
    existePorcodigoBairro(codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            const existePorcodigoBairro = yield this.bairroDAO.existePorcodigoBairro(codigoBairro);
            if (!existePorcodigoBairro) {
                throw new AppError_1.default(`O codigoBairro ${codigoBairro} não existe.`, 400);
            }
        });
    }
}
exports.default = BairroService;
