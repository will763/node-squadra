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
exports.UfDAO = void 0;
const index_1 = require("../framework/AbstractDAO/index");
const conexao_1 = require("../banco/conexao");
const BancoErro_1 = __importDefault(require("../framework/erros/BancoErro"));
class UfDAO extends index_1.AbstractDao {
    constructor() {
        super();
    }
    criar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sqlGerarSequence = 'SELECT SEQUENCE_UF.NEXTVAL AS CODIGO FROM DUAL';
                const resultado = yield conexao.execute(sqlGerarSequence);
                const codigo = resultado.rows[0][0];
                const { sigla, nome, status } = parametros;
                const sqlCriar = 'INSERT INTO TB_UF (CODIGO_UF, SIGLA, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
                yield conexao.execute(sqlCriar, [codigo, sigla, nome, status]);
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
    listar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { codigoUF, sigla, nome, status } = parametros;
                let sql = 'SELECT * FROM TB_UF WHERE 1 = 1';
                let parametro = [];
                if (codigoUF) {
                    sql += ' AND CODIGO_UF = :codigoUF';
                    parametro.push(codigoUF);
                }
                if (sigla) {
                    sql += ' AND SIGLA = :sigla';
                    parametro.push(sigla);
                }
                if (nome) {
                    sql += ' AND NOME = :nome';
                    parametro.push(nome);
                }
                if (status) {
                    sql += ' AND STATUS = :status';
                    parametro.push(status);
                }
                sql += ' ORDER BY CODIGO_UF DESC';
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
    atualizar(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { codigoUF, sigla, nome, status } = parametros;
                let sql = 'UPDATE TB_UF SET SIGLA = :sigla, NOME = :nome, STATUS = :status WHERE CODIGO_UF = :codigoUF';
                let parametro = [sigla, nome, status, codigoUF];
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
    deletar(codigoUf) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = `DELETE FROM TB_UF WHERE CODIGO_UF = :codigoUf`;
                const resultado = yield conexao.execute(sql, [codigoUf]);
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
    listarTodosRegistros() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT * FROM TB_UF ORDER BY CODIGO_UF DESC';
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
    existeUfPorNome(nome, codigoUF) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                let sql = `SELECT * FROM TB_UF WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI')`;
                const parametros = [nome];
                if (codigoUF) {
                    sql += ' AND CODIGO_UF <> :codigoUF';
                    parametros.push(codigoUF);
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
    existeUfPorSigla(sigla, codigoUF) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                let sql = 'SELECT * FROM TB_UF WHERE SIGLA = :sigla';
                const parametros = [sigla];
                if (codigoUF) {
                    sql += ' AND CODIGO_UF <> :codigoUF';
                    parametros.push(codigoUF);
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
    existeUfPorcodigoUF(codigoUF) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT * FROM TB_UF WHERE CODIGO_UF = :codigoUF';
                const resultado = yield conexao.execute(sql, { codigoUF });
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
exports.UfDAO = UfDAO;
