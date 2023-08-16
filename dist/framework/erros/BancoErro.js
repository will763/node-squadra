"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BancoErro {
    constructor(mensagem, status = 400) {
        this.mensagem = mensagem;
        this.status = status;
    }
}
exports.default = BancoErro;
