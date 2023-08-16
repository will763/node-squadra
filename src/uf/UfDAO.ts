import OracleDB from "oracledb";
import { AbstractDao } from "../framework/AbstractDAO/index"
import { conectar } from "../banco/conexao"
import { UfDTO } from "./UfDTO"
import BancoErro from "../framework/erros/BancoErro";

export class UfDAO extends AbstractDao<UfDTO> {

    constructor() {
        super();
    }

    async criar(parametros: UfDTO) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sqlGerarSequence = 'SELECT SEQUENCE_UF.NEXTVAL AS CODIGO FROM DUAL';
            const resultado = await conexao.execute(sqlGerarSequence);
            const codigo = resultado.rows[0][0];

            const { sigla, nome, status } = parametros;

            const sqlCriar = 'INSERT INTO TB_UF (CODIGO_UF, SIGLA, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
            await conexao.execute(sqlCriar, [codigo, sigla, nome, status]);

            await conexao.commit();

        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async listar(parametros: UfDTO) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

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

            const resultado = await conexao.execute(sql, parametro);
            return resultado.rows;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async atualizar(parametros: UfDTO): Promise<void> {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const { codigoUF, sigla, nome, status } = parametros;

            let sql = 'UPDATE TB_UF SET SIGLA = :sigla, NOME = :nome, STATUS = :status WHERE CODIGO_UF = :codigoUF';
            let parametro = [sigla, nome, status, codigoUF];

            await conexao.execute(sql, parametro);

            await conexao.commit();

        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async deletar(codigoUf: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = `DELETE FROM TB_UF WHERE CODIGO_UF = :codigoUf`;
            const resultado = await conexao.execute(sql, [codigoUf]);

            await conexao.commit();

            return resultado.rowsAffected;
        } catch (error) {
            conexao && await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async listarTodosRegistros() {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT * FROM TB_UF ORDER BY CODIGO_UF DESC';
            const resultado = await conexao.execute(sql);
            return resultado.rows;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async existeUfPorNome(nome: string, codigoUF?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            let sql = `SELECT * FROM TB_UF WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI')`;
            const parametros: unknown[] = [nome]

            if (codigoUF) {
                sql += ' AND CODIGO_UF <> :codigoUF'
                parametros.push(codigoUF)
            }

            const resultado = await conexao.execute(sql, parametros);
            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async existeUfPorSigla(sigla: string,codigoUF?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            let sql = 'SELECT * FROM TB_UF WHERE SIGLA = :sigla';
            const parametros:unknown[] = [sigla]

            if (codigoUF) {
                sql += ' AND CODIGO_UF <> :codigoUF'
                parametros.push(codigoUF)
            }

            const resultado = await conexao.execute(sql, parametros)
            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async existeUfPorcodigoUF(codigoUF: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT * FROM TB_UF WHERE CODIGO_UF = :codigoUF';
            const resultado = await conexao.execute(sql, { codigoUF })
            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

}