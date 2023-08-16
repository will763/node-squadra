"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareErro = void 0;
const AppError_1 = __importDefault(require("./AppError"));
const middlewareErro = (error, req, res, next) => {
    var _a, _b;
    if (error instanceof AppError_1.default) {
        if ((_a = error === null || error === void 0 ? void 0 : error.mensagem) === null || _a === void 0 ? void 0 : _a.includes("ORA-01017")) {
            const resposta = {
                mensagem: 'A senha ou usuario do banco de dados está incorreto!',
                status: 500,
            };
            return res.status(500).json(resposta);
        }
        if ((_b = error === null || error === void 0 ? void 0 : error.mensagem) === null || _b === void 0 ? void 0 : _b.includes('NJS-503')) {
            const resposta = {
                mensagem: 'Erro de conexão com o banco de dados.',
                status: 500,
            };
            return res.status(500).json(resposta);
        }
        const resposta = Object.assign({ mensagem: error.mensagem, status: error.status }, (error && error.nomeDoCampo && { nomeDoCampo: error.nomeDoCampo }));
        return res.status(error.status).json(resposta);
    }
    if (error instanceof SyntaxError) {
        if ("status" in error) {
            return res.status(error.status).json({
                mensagem: "Houve um problema com a sua requisição devido a um JSON incorreto, verifique se o json que você enviou e tente novamente",
                status: error.status
            });
        }
    }
    return res.status(500).json({
        mensagem: "Desculpe, o servidor não conseguiu processar sua requisição, tente novamente em alguns instantes",
        status: 500
    });
};
exports.middlewareErro = middlewareErro;
