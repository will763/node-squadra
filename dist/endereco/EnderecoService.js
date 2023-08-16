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
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const EnderecoDAO_1 = __importDefault(require("./EnderecoDAO"));
class EnderecoService {
    constructor() {
        this.enderecoDAO = new EnderecoDAO_1.default();
    }
    existeEndereco(codigoEndereco) {
        return __awaiter(this, void 0, void 0, function* () {
            const endereco = yield this.enderecoDAO.existeEndereco(codigoEndereco);
            if (!endereco) {
                throw new AppError_1.default(`Não existe uma endereco com o codigoEndereco ${codigoEndereco}, por favor insira um codigoEndereco válido!`, 400);
            }
        });
    }
}
exports.default = EnderecoService;
