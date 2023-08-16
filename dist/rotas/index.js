"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotas = void 0;
const UfRotas_1 = __importDefault(require("../uf/UfRotas"));
const MunicipioRotas_1 = __importDefault(require("../municipio/MunicipioRotas"));
const BairroRotas_1 = __importDefault(require("../bairro/BairroRotas"));
const PessoaRotas_1 = __importDefault(require("../pessoa/PessoaRotas"));
const rotas = (app) => {
    app.use('/', UfRotas_1.default);
    app.use('/', MunicipioRotas_1.default);
    app.use('/', BairroRotas_1.default);
    app.use('/', PessoaRotas_1.default);
};
exports.rotas = rotas;
