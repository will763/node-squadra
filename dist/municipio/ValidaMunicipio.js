"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const MunicipioSchema_1 = require("./MunicipioSchema");
class ValidaMunicipio {
    listar(req, res, next) {
        const { codigoMunicipio, codigoUF, nome, status } = req.query;
        const corpoRequisicao = { codigoMunicipio, codigoUF, nome, status };
        const result = MunicipioSchema_1.listarMunicipioSchema.validate(corpoRequisicao);
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    criar(req, res, next) {
        const { codigoUF, nome, status } = req.body;
        const result = MunicipioSchema_1.criarMunicipioSchema.validate({ codigoUF, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    atualizar(req, res, next) {
        const { codigoMunicipio, codigoUF, nome, status } = req.body;
        const result = MunicipioSchema_1.atualizarMunicipioSchema.validate({ codigoMunicipio, codigoUF, nome, status });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
    deletar(req, res, next) {
        const { codigoMunicipio } = req.body;
        const result = MunicipioSchema_1.deletarMunicipioSchema.validate({ codigoMunicipio });
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key;
            throw new AppError_1.default(mensagem, 400, nomeDoCampo);
        }
        next();
    }
}
exports.default = ValidaMunicipio;
