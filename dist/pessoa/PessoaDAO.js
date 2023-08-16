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
exports.PessoaDAO = void 0;
const BancoErro_1 = __importDefault(require("../framework/erros/BancoErro"));
const conexao_1 = require("../banco/conexao");
const AbstractDAO_1 = require("../framework/AbstractDAO");
class PessoaDAO extends AbstractDAO_1.AbstractDao {
    constructor() {
        super();
    }
    criar(parametros) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const { nome, sobrenome, idade, login, senha, status, enderecos } = parametros;
                const resultadoPessoa = yield conexao.execute('SELECT SEQUENCE_PESSOA.NEXTVAL AS CODIGO FROM DUAL');
                const codigoPessoa = (_b = (_a = resultadoPessoa.rows) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[0];
                const sqlPessoa = `
               INSERT INTO TB_PESSOA (CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS)
               VALUES (:val1, :val2, :val3, :val4,:val5,:val6,:val7)`;
                yield conexao.execute(sqlPessoa, [
                    codigoPessoa,
                    nome,
                    sobrenome,
                    idade,
                    login,
                    senha,
                    status,
                ]);
                for (const endereco of enderecos) {
                    const resultadoEndereco = yield conexao.execute('SELECT SEQUENCE_ENDERECO.NEXTVAL AS CODIGO FROM DUAL');
                    const codigoEndereco = (_d = (_c = resultadoEndereco.rows) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d[0];
                    const sqlEndereco = `
                  INSERT INTO TB_ENDERECO (CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP)
                  VALUES (:codigoEndereco, :codigoPessoa, :codigoBairro, :nomeRua, :numero, :complemento, :cep)`;
                    yield conexao.execute(sqlEndereco, {
                        codigoEndereco,
                        codigoPessoa,
                        codigoBairro: endereco.codigoBairro,
                        nomeRua: endereco.nomeRua,
                        numero: endereco.numero,
                        complemento: endereco.complemento,
                        cep: endereco.cep,
                    });
                }
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
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const resultado = yield conexao.execute('SELECT CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS FROM TB_PESSOA ORDER BY CODIGO_PESSOA DESC');
                const pessoas = resultado.rows.map((row) => ({
                    codigoPessoa: row[0],
                    nome: row[1],
                    sobrenome: row[2],
                    idade: row[3],
                    login: row[4],
                    senha: row[5],
                    status: row[6],
                    enderecos: []
                }));
                return pessoas;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    listarDinamicamente(codigoPessoa, login, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                if (!codigoPessoa) {
                    let sql = `SELECT CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS FROM TB_PESSOA WHERE 1 = 1`;
                    const parametros = [];
                    if (login) {
                        sql += ' AND LOGIN = :login';
                        parametros.push(login);
                    }
                    if (status) {
                        sql += ' AND STATUS = :status';
                        parametros.push(status);
                    }
                    sql += ' ORDER BY CODIGO_PESSOA DESC';
                    console.log(sql);
                    const resultado = yield conexao.execute(sql, parametros);
                    const pessoas = resultado.rows.map((row) => ({
                        codigoPessoa: row[0],
                        nome: row[1],
                        sobrenome: row[2],
                        idade: row[3],
                        login: row[4],
                        senha: row[5],
                        status: row[6],
                        enderecos: []
                    }));
                    return pessoas;
                }
                let sql = `
              SELECT 
                TB_PESSOA.CODIGO_PESSOA, TB_PESSOA.NOME, TB_PESSOA.SOBRENOME, TB_PESSOA.IDADE, TB_PESSOA.LOGIN, TB_PESSOA.SENHA, TB_PESSOA.STATUS,
                TB_ENDERECO.CODIGO_ENDERECO, TB_ENDERECO.NOME_RUA, TB_ENDERECO.NUMERO, TB_ENDERECO.COMPLEMENTO, TB_ENDERECO.CEP,
                TB_BAIRRO.CODIGO_BAIRRO, TB_BAIRRO.NOME AS NOME_BAIRRO,
                TB_MUNICIPIO.CODIGO_MUNICIPIO, TB_MUNICIPIO.NOME AS NOME_MUNICIPIO,
                TB_UF.CODIGO_UF, TB_UF.SIGLA, TB_UF.NOME AS NOME_UF
            FROM 
                TB_PESSOA
                 INNER JOIN TB_ENDERECO ON TB_PESSOA.CODIGO_PESSOA = TB_ENDERECO.CODIGO_PESSOA
                 INNER JOIN TB_BAIRRO ON TB_ENDERECO.CODIGO_BAIRRO = TB_BAIRRO.CODIGO_BAIRRO
                 INNER JOIN TB_MUNICIPIO ON TB_BAIRRO.CODIGO_MUNICIPIO = TB_MUNICIPIO.CODIGO_MUNICIPIO
                 INNER JOIN TB_UF ON TB_MUNICIPIO.CODIGO_UF = TB_UF.CODIGO_UF
            WHERE 1 = 1`;
                const parametros = [];
                if (codigoPessoa) {
                    sql += ' AND TB_PESSOA.CODIGO_PESSOA = :codigoPessoa';
                    parametros.push(codigoPessoa);
                }
                if (login) {
                    sql += ' AND TB_PESSOA.LOGIN = :login';
                    parametros.push(login);
                }
                if (status) {
                    sql += ' AND TB_PESSOA.STATUS = :status';
                    parametros.push(status);
                }
                sql += ' ORDER BY TB_PESSOA.CODIGO_PESSOA DESC';
                const resultado = yield conexao.execute(sql, parametros);
                const endereco = resultado.rows.map((row) => ({
                    codigoEndereco: row[7],
                    codigoPessoa: row[0],
                    codigoBairro: row[12],
                    nomeRua: row[8],
                    numero: row[9],
                    complemento: row[10],
                    cep: row[11],
                    bairro: {
                        codigoBairro: row[12],
                        codigoMunicipio: row[13],
                        nome: row[13],
                        status: row[14],
                        municipio: {
                            codigoMunicipio: row[13],
                            codigoUF: row[15],
                            nome: row[14],
                            status: row[15],
                            uf: {
                                codigoUF: row[15],
                                sigla: row[16],
                                nome: row[17],
                                status: row[18],
                            },
                        },
                    },
                }));
                const pessoas = resultado.rows.map((row) => ({
                    codigoPessoa: row[0],
                    nome: row[1],
                    sobrenome: row[2],
                    idade: row[3],
                    login: row[4],
                    senha: row[5],
                    status: row[6],
                    enderecos: endereco,
                }));
                return pessoas;
            }
            catch (error) {
                throw new BancoErro_1.default(error.message, 500);
            }
            finally {
                conexao && (yield conexao.close());
            }
        });
    }
    deletar(codigoPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa`;
                yield conexao.execute(sqlEndereco, [codigoPessoa]);
                const sqlPessoa = `DELETE FROM TB_PESSOA WHERE CODIGO_PESSOA = :codigoPessoa`;
                const resultado = yield conexao.execute(sqlPessoa, [codigoPessoa]);
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
    atualizar(pessoa) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const manterEndereco = pessoa === null || pessoa === void 0 ? void 0 : pessoa.enderecos.filter((endereco) => endereco === null || endereco === void 0 ? void 0 : endereco.codigoEndereco).map((endereco) => endereco === null || endereco === void 0 ? void 0 : endereco.codigoEndereco);
                if ((manterEndereco === null || manterEndereco === void 0 ? void 0 : manterEndereco.length) > 0) {
                    const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa AND CODIGO_ENDERECO NOT IN (${manterEndereco.join(',')})`;
                    yield conexao.execute(sqlEndereco, [pessoa.codigoPessoa]);
                }
                else {
                    const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa`;
                    yield conexao.execute(sqlEndereco, [pessoa.codigoPessoa]);
                }
                const { nome, sobrenome, idade, login, senha, status, codigoPessoa } = pessoa;
                const sql = 'UPDATE TB_PESSOA SET NOME = :nome, SOBRENOME = :sobrenome, IDADE = :idade, LOGIN = :login, SENHA = :senha, STATUS = :status WHERE CODIGO_PESSOA = :codigoPessoa';
                const parametros = [nome, sobrenome, idade, login, senha, status, codigoPessoa];
                yield conexao.execute(sql, parametros);
                for (const endereco of pessoa === null || pessoa === void 0 ? void 0 : pessoa.enderecos) {
                    const { codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, codigoEndereco } = endereco;
                    if (!(endereco === null || endereco === void 0 ? void 0 : endereco.codigoEndereco)) {
                        const resultadoEndereco = yield conexao.execute('SELECT SEQUENCE_ENDERECO.NEXTVAL AS CODIGO FROM DUAL');
                        const codigoEndereco = (_b = (_a = resultadoEndereco.rows) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[0];
                        const sqlEndereco = `
                      INSERT INTO TB_ENDERECO (CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP)
                      VALUES (:codigoEndereco, :codigoPessoa, :codigoBairro, :nomeRua, :numero, :complemento, :cep)`;
                        const parametros = [codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep];
                        yield conexao.execute(sqlEndereco, parametros);
                    }
                    if (endereco === null || endereco === void 0 ? void 0 : endereco.codigoEndereco) {
                        const sql = 'UPDATE TB_ENDERECO SET CODIGO_PESSOA = :codigoPessoa, CODIGO_BAIRRO = :codigoBairro, NOME_RUA = :nomeRua, NUMERO = :numero, COMPLEMENTO = :complemento, CEP = :cep WHERE CODIGO_ENDERECO = :codigoEndereco';
                        const parametros = [codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, codigoEndereco];
                        yield conexao.execute(sql, parametros);
                    }
                }
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
    existePessoaPeloLogin(login, codigoPessoa) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                let sql = `SELECT COUNT(*) FROM TB_PESSOA WHERE TRIM(UPPER(LOGIN)) = TRIM(UPPER(:login))`;
                const parametros = [login];
                if (codigoPessoa) {
                    sql += ' AND CODIGO_PESSOA <> :codigoPessoa';
                    parametros.push(codigoPessoa);
                }
                const resultado = yield conexao.execute(sql, parametros);
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
    existePessoaPorCodigoPessoa(codigoPessoa) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, conexao_1.conectar)();
                const sql = 'SELECT COUNT(*) FROM TB_PESSOA WHERE CODIGO_PESSOA = :codigoPessoa';
                const resultado = yield conexao.execute(sql, { codigoPessoa });
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
exports.PessoaDAO = PessoaDAO;
