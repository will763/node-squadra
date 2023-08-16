"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PessoaController_1 = __importDefault(require("./PessoaController"));
const ValidaPessoa_1 = __importDefault(require("./ValidaPessoa"));
const controller = new PessoaController_1.default();
const valida = new ValidaPessoa_1.default();
const pessoaRotas = (0, express_1.Router)();
pessoaRotas.post('/pessoa', valida.criar, controller.criar);
pessoaRotas.get('/pessoa', valida.listar, controller.listar);
pessoaRotas.delete('/pessoa', valida.deletar, controller.deletar);
pessoaRotas.put('/pessoa', valida.atualizar, controller.atualizar);
exports.default = pessoaRotas;
