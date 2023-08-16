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
exports.MunicipioDAO = void 0;
const index_1 = require("../framework/AbstractDAO/index");
const conexao_1 = require("../banco/conexao");
const BancoErro_1 = __importDefault(require("../framework/erros/BancoErro"));
class MunicipioDAO extends index_1.AbstractDao {
    constructor() {
        super();
    }
    criar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sqlGerarSequence = 'SELECT SEQUENCE_MUNICIPIO.NEXTVAL AS CODIGO FROM DUAL';
                const resultado = yield conexao.execute(sqlGerarSequence);
                const codigoMunicipio = resultado.rows[0][0];
                const { codigoUF, nome, status } = parametros;
                const sqlCriar = 'INSERT INTO TB_MUNICIPIO (CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
                yield conexao.execute(sqlCriar, [codigoMunicipio, codigoUF, nome, status]);
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
    atualizar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { codigoMunicipio, codigoUF, nome, status } = parametros;
                let sql = 'UPDATE TB_MUNICIPIO SET CODIGO_UF = :codigoUF, NOME = :nome, STATUS = :status  WHERE CODIGO_MUNICIPIO = :codigoMunicipio';
                let parametro = [codigoUF, nome, status, codigoMunicipio];
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
    deletar(codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = `DELETE FROM TB_MUNICIPIO WHERE CODIGO_MUNICIPIO = :codigoMunicipio`;
                const resultado = yield conexao.execute(sql, [codigoMunicipio]);
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
                const { codigoMunicipio, codigoUF, nome, status } = parametros;
                let sql = 'SELECT * FROM TB_MUNICIPIO WHERE 1 = 1';
                let parametro = [];
                if (codigoMunicipio) {
                    sql += ' AND CODIGO_MUNICIPIO = :codigoMunicipio';
                    parametro.push(codigoMunicipio);
                }
                if (codigoUF) {
                    sql += ' AND CODIGO_UF = :codigoUF';
                    parametro.push(codigoUF);
                }
                if (nome) {
                    sql += ' AND NOME = :nome';
                    parametro.push(nome);
                }
                if (status) {
                    sql += ' AND STATUS = :status';
                    parametro.push(status);
                }
                sql += ' ORDER BY CODIGO_MUNICIPIO DESC';
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
                const sql = 'SELECT * FROM TB_MUNICIPIO ORDER BY CODIGO_MUNICIPIO DESC';
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
    existeMunicipioEmUf(nome, codigoUF, codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                let sql = `SELECT * FROM TB_MUNICIPIO WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI') AND CODIGO_UF = :codigoUF`;
                const parametros = [nome, codigoUF];
                if (codigoMunicipio) {
                    parametros.push(codigoMunicipio);
                    sql += ' AND CODIGO_MUNICIPIO <> :codigoMunicipio';
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
    existePorcodigoMunicipio(codigoMunicipio) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT * FROM TB_MUNICIPIO WHERE CODIGO_MUNICIPIO = :codigoMunicipio';
                const resultado = yield conexao.execute(sql, { codigoMunicipio });
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
exports.MunicipioDAO = MunicipioDAO;
