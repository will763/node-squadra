import OracleDB from "oracledb";
import { AbstractDao } from "../framework/AbstractDAO/index"
import { conectar } from "../banco/conexao"
import MunicipioDTO from "./MunicipioDTO";
import BancoErro from "../framework/erros/BancoErro";

export class MunicipioDAO extends AbstractDao<MunicipioDTO> {

    constructor() {
        super();
    }

    async criar(parametros: Partial<MunicipioDTO>) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sqlGerarSequence = 'SELECT SEQUENCE_MUNICIPIO.NEXTVAL AS CODIGO FROM DUAL';
            const resultado = await conexao.execute(sqlGerarSequence);
            const codigoMunicipio = resultado.rows[0][0];

            const { codigoUF, nome, status } = parametros;

            const sqlCriar = 'INSERT INTO TB_MUNICIPIO (CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
            await conexao.execute(sqlCriar, [codigoMunicipio, codigoUF, nome, status]);

            await conexao.commit();

        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async atualizar(parametros: MunicipioDTO): Promise<void> {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const { codigoMunicipio, codigoUF, nome, status } = parametros;

            let sql = 'UPDATE TB_MUNICIPIO SET CODIGO_UF = :codigoUF, NOME = :nome, STATUS = :status  WHERE CODIGO_MUNICIPIO = :codigoMunicipio';
            let parametro = [codigoUF, nome, status, codigoMunicipio];

            await conexao.execute(sql, parametro);

            await conexao.commit();

        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async deletar(codigoMunicipio: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = `DELETE FROM TB_MUNICIPIO WHERE CODIGO_MUNICIPIO = :codigoMunicipio`;
            const resultado = await conexao.execute(sql, [codigoMunicipio]);

            await conexao.commit();

            return resultado.rowsAffected;
        } catch (error) {
            conexao && await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async listar(parametros: MunicipioDTO) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

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

            const resultado = await conexao.execute(sql, parametro);
            return resultado.rows;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async listarTodosRegistros() {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT * FROM TB_MUNICIPIO ORDER BY CODIGO_MUNICIPIO DESC';
            const resultado = await conexao.execute(sql);
            return resultado.rows;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async existeMunicipioEmUf(nome: string, codigoUF: number,codigoMunicipio?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            let sql = `SELECT * FROM TB_MUNICIPIO WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI') AND CODIGO_UF = :codigoUF`;
            const parametros = [nome, codigoUF];

            if(codigoMunicipio){
                parametros.push(codigoMunicipio);
                sql += ' AND CODIGO_MUNICIPIO <> :codigoMunicipio'
            }

            const resultado = await conexao.execute(sql, parametros);
            
            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async existePorcodigoMunicipio(codigoMunicipio: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT * FROM TB_MUNICIPIO WHERE CODIGO_MUNICIPIO = :codigoMunicipio';
            const resultado = await conexao.execute(sql, { codigoMunicipio });
            
            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

}