"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const BairroSchema_1 = require("./BairroSchema");
class ValidaBairro {
    criar(req, res, next) {
        const { codigoMunicipio, nome, status } = req.body;
        const result = BairroSchema_1.criarBairroSchema.validate({ codigoMunicipio, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    listar(req, res, next) {
        const { codigoBairro, codigoMunicipio, nome, status } = req.query;
        const result = BairroSchema_1.listarBairroSchema.validate({ codigoBairro, codigoMunicipio, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    atualizar(req, res, next) {
        const { codigoBairro, codigoMunicipio, nome, status } = req.body;
        const result = BairroSchema_1.atualizarBairroSchema.validate({ codigoBairro, codigoMunicipio, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    deletar(req, res, next) {
        const { codigoBairro } = req.body;
        const result = BairroSchema_1.deletarBairroSchema.validate({ codigoBairro });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
}
exports.default = ValidaBairro;
