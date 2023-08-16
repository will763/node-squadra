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
exports.BairroDAO = void 0;
const index_1 = require("../framework/AbstractDAO/index");
const conexao_1 = require("../banco/conexao");
const BancoErro_1 = __importDefault(require("../framework/erros/BancoErro"));
class BairroDAO extends index_1.AbstractDao {
    constructor() {
        super();
    }
    criar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sqlGerarSequence = 'SELECT SEQUENCE_BAIRRO.NEXTVAL AS CODIGO FROM DUAL';
                const resultado = yield conexao.execute(sqlGerarSequence);
                const codigoBairro = resultado.rows[0][0];
                const { codigoMunicipio, nome, status } = parametros;
                const sqlCriar = 'INSERT INTO TB_BAIRRO (CODIGO_BAIRRO,CODIGO_MUNICIPIO, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
                yield conexao.execute(sqlCriar, [codigoBairro, codigoMunicipio, nome, status]);
                yield conexao.commit();
            }
            catch (error) {
                console.log(error);
                yield conexao.rollback();
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    atualizar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { codigoBairro, codigoMunicipio, nome, status } = parametros;
                let sql = 'UPDATE TB_BAIRRO SET CODIGO_MUNICIPIO = :codigoMunicipio, NOME = :nome, STATUS = :status WHERE CODIGO_BAIRRO = :codigoBairro';
                let parametro = [codigoMunicipio, nome, status, codigoBairro];
                yield conexao.execute(sql, parametro);
                yield conexao.commit();
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
    deletar(codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = `DELETE FROM TB_BAIRRO WHERE CODIGO_BAIRRO = :codigoBairro`;
                const resultado = yield conexao.execute(sql, [codigoBairro]);
                yield conexao.commit();
                return resultado.rowsAffected;
            }
            catch (error) {
                conexao && (yield conexao.rollback());
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    listar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { codigoBairro, codigoMunicipio, nome, status } = parametros;
                let sql = 'SELECT * FROM TB_BAIRRO WHERE 1 = 1';
                let parametro = [];
                if (codigoBairro) {
                    sql += ' AND CODIGO_BAIRRO = :codigoBairro';
                    parametro.push(codigoBairro);
                }
                if (codigoMunicipio) {
                    sql += ' AND CODIGO_MUNICIPIO = :codigoMunicipio';
                    parametro.push(codigoMunicipio);
                }
                if (nome) {
                    sql += ' AND NOME = :nome';
                    parametro.push(nome);
                }
                if (status) {
                    sql += ' AND STATUS = :status';
                    parametro.push(status);
                }
                sql += ' ORDER BY CODIGO_BAIRRO DESC';
                const resultado = yield conexao.execute(sql, parametro);
                return resultado.rows;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    listarTodosRegistros() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT * FROM TB_BAIRRO ORDER BY CODIGO_BAIRRO DESC';
                const resultado = yield conexao.execute(sql);
                return resultado.rows;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    existeBairroEmMunicipio(nome, municipio, codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                let sql = `SELECT * FROM TB_BAIRRO WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI') AND CODIGO_MUNICIPIO = :municipio`;
                const parametros = [nome, municipio];
                if (codigoBairro) {
                    sql += ' AND CODIGO_BAIRRO <> :codigoBairro';
                    parametros.push(codigoBairro);
                }
                const resultado = yield conexao.execute(sql, parametros);
                return resultado.rows.length > 0;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    existePorcodigoBairro(codigoBairro) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT * FROM TB_BAIRRO WHERE CODIGO_BAIRRO = :codigoBairro';
                const resultado = yield conexao.execute(sql, { codigoBairro });
                return resultado.rows.length > 0;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
}
exports.BairroDAO = BairroDAO;
