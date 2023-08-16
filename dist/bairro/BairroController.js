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
exports.BairroController = void 0;
const BairroService_1 = __importDefault(require("./BairroService"));
;
class BairroController {
    constructor() {
        this.bairroService = new BairroService_1.default();
        this.listar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoBairro, codigoMunicipio, nome, status } = req.query;
            try {
                const result = yield this.bairroService.listarMunicipioDinamicamente({ codigoBairro, codigoMunicipio, nome, status });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.criar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoMunicipio, nome, status } = req.body;
            try {
                const result = yield this.bairroService.criarDepoisListarTodos({ codigoMunicipio, nome, status });
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.atualizar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoBairro, codigoMunicipio, nome, status } = req.body;
            try {
                const result = yield this.bairroService.atualizarDepoisListarTodos(codigoBairro, codigoMunicipio, nome, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoBairro } = req.body;
            try {
                const result = yield this.bairroService.deletar(codigoBairro);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BairroController = BairroController;
exports.default = BairroController;
