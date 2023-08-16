"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MunicipioController_1 = __importDefault(require("./MunicipioController"));
const ValidaMunicipio_1 = __importDefault(require("./ValidaMunicipio"));
const controller = new MunicipioController_1.default();
const validaMunicipio = new ValidaMunicipio_1.default();
const municipioRotas = (0, express_1.Router)();
municipioRotas.post('/municipio', validaMunicipio.criar, controller.criar);
municipioRotas.delete('/municipio', validaMunicipio.deletar, controller.deletar);
municipioRotas.put('/municipio', validaMunicipio.atualizar, controller.atualizar);
municipioRotas.get('/municipio', validaMunicipio.listar, controller.listar);
exports.default = municipioRotas;
