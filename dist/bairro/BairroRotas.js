"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BairroController_1 = __importDefault(require("./BairroController"));
const ValidaBairro_1 = __importDefault(require("./ValidaBairro"));
const controller = new BairroController_1.default();
const valida = new ValidaBairro_1.default();
const bairroRotas = (0, express_1.Router)();
bairroRotas.post('/bairro', valida.criar, controller.criar);
bairroRotas.delete('/bairro', valida.deletar, controller.deletar);
bairroRotas.get('/bairro', valida.listar, controller.listar);
bairroRotas.put('/bairro', valida.atualizar, controller.atualizar);
exports.default = bairroRotas;
