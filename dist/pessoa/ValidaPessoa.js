"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const PessoaSchema_1 = require("./PessoaSchema");
class ValidaPessoa {
    criar(req, res, next) {
        const { nome, sobrenome, idade, login, senha, status, enderecos } = req.body;
        const result = PessoaSchema_1.criarPessoa.validate({ nome, sobrenome, idade, login, senha, status, enderecos });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    atualizar(req, res, next) {
        const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = req.body;
        const result = PessoaSchema_1.atualizarPessoa.validate({ codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    listar(req, res, next) {
        const { codigoPessoa, login, status } = req.query;
        const result = PessoaSchema_1.listarPessoa.validate({ codigoPessoa, login, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    deletar(req, res, next) {
        const { codigoPessoa } = req.body;
        const result = PessoaSchema_1.deletarPessoa.validate({ codigoPessoa });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
}
exports.default = ValidaPessoa;
