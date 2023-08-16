"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidaUf_1 = __importDefault(require("./ValidaUf"));
const UfController_1 = __importDefault(require("./UfController"));
const controller = new UfController_1.default();
const validaUf = new ValidaUf_1.default();
const ufRotas = (0, express_1.Router)();
ufRotas.post('/uf', validaUf.criar, controller.criarUf);
ufRotas.get('/uf', validaUf.listar, controller.listarUf);
ufRotas.put('/uf', validaUf.atualizar, controller.atualizarUf);
ufRotas.delete('/uf', validaUf.deletar, controller.deletarUf);
exports.default = ufRotas;
