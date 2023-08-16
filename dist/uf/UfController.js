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
exports.UfController = void 0;
const UfService_1 = __importDefault(require("./UfService"));
;
class UfController {
    constructor() {
        this.ufService = new UfService_1.default();
        this.criarUf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { sigla, nome, status } = req.body;
            try {
                const result = yield this.ufService.criarDepoisListarTodos(sigla, nome, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.listarUf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoUF, sigla, nome, status } = req.query;
            try {
                const result = yield this.ufService.listarUfDinamicamente(codigoUF, sigla, nome, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.atualizarUf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoUF, sigla, nome, status } = req.body;
            try {
                const result = yield this.ufService.atualizarDepoisListarTodos(codigoUF, sigla, nome, status);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletarUf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { codigoUF } = req.body;
            try {
                const result = yield this.ufService.deletar(codigoUF);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UfController = UfController;
exports.default = UfController;
