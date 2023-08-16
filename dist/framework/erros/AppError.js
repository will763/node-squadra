"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(mensagem, status = 400, nomeDoCampo) {
        this.mensagem = mensagem;
        this.status = status;
        this.nomeDoCampo = nomeDoCampo;
    }
}
exports.default = AppError;
