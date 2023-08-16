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
const conexao_1 = require("../banco/conexao");
const BancoErro_1 = __importDefault(require("../framework/erros/BancoErro"));
class EnderecoDAO {
    existeEndereco(codigoEndereco) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT COUNT(*) FROM TB_ENDERECO WHERE CODIGO_ENDERECO = :codigoEndereco';
                const resultado = yield conexao.execute(sql, { codigoEndereco });
                const count = (_b = (_a = resultado.rows) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[0];
                return count > 0;
            }
            catch (error) {
                yield conexao.rollback();
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
}
exports.default = EnderecoDAO;
