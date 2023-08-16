"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipioController = void 0;
const MunicipioService_1 = __importDefault(require("./MunicipioService"));
;
class MunicipioController {
    constructor() {
        this.municipioService = new MunicipioService_1.default();
        this.listar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoMunicipio, codigoUF, nome, status } = req.query;
            try {
                const result = yield this.municipioService.listarMunicipioDinamicamente({ codigoMunicipio, codigoUF, nome, status });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.criar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoUF, nome, status } = req.body;
            try {
                const result = yield this.municipioService.criarDepoisListarTodos({ codigoUF, nome, status });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.atualizar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoMunicipio, codigoUF, nome, status } = req.body;
            try {
                const result = yield this.municipioService.atualizarDepoisListarTodos(codigoMunicipio, codigoUF, nome, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoMunicipio } = req.body;
            try {
                const result = yield this.municipioService.deletar(codigoMunicipio);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.MunicipioController = MunicipioController;
exports.default = MunicipioController;
