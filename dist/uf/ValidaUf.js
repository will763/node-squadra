"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UfSchema_1 = require("./UfSchema");
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
class ValidaUf {
    listar(req, res, next) {
        const { codigoUF, sigla, nome, status } = req.query;
        const result = UfSchema_1.listarUfSchema.validate({ codigoUF, sigla, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    criar(req, res, next) {
        const { nome, sigla, status } = req.body;
        const result = UfSchema_1.criarUfSchema.validate({ nome, sigla, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    atualizar(req, res, next) {
        const { codigoUF, sigla, nome, status } = req.body;
        const result = UfSchema_1.atualizarUfSchema.validate({ codigoUF, nome, sigla, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    deletar(req, res, next) {
        const { codigoUF } = req.body;
        const result = UfSchema_1.deletarUfSchema.validate({ codigoUF });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
}
exports.default = ValidaUf;
