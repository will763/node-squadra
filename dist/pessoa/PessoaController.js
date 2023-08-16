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
exports.PessoaController = void 0;
const PessoaService_1 = __importDefault(require("./PessoaService"));
;
class PessoaController {
    constructor() {
        this.pessoaService = new PessoaService_1.default();
        this.criar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { nome, sobrenome, idade, login, senha, status, enderecos } = req.body;
            try {
                const result = yield this.pessoaService.criarDepoisListarTodos({ nome, sobrenome, idade, login, senha, status, enderecos });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.atualizar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = req.body;
            try {
                const result = yield this.pessoaService.atualizarDepoisListarTodos({ codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.listar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoPessoa, login, status } = req.query;
            try {
                const result = yield this.pessoaService.listarDinamicamente(codigoPessoa, login, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoPessoa } = req.body;
            try {
                const result = yield this.pessoaService.deletar(codigoPessoa);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PessoaController = PessoaController;
exports.default = PessoaController;
