import OracleDB from "oracledb";
import { AbstractDao } from "../framework/AbstractDAO/index"
import { conectar } from "../banco/conexao"
import BairroDTO from "./BairroDTO";
import BancoErro from "../framework/erros/BancoErro";

export class BairroDAO extends AbstractDao<BairroDTO> {

    constructor() {
        super();
    }

    async criar(parametros: Partial<BairroDTO>) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sqlGerarSequence = 'SELECT SEQUENCE_BAIRRO.NEXTVAL AS CODIGO FROM DUAL';
            const resultado = await conexao.execute(sqlGerarSequence);
            const codigoBairro = resultado.rows[0][0];

            const { codigoMunicipio, nome, status } = parametros;

            const sqlCriar = 'INSERT INTO TB_BAIRRO (CODIGO_BAIRRO,CODIGO_MUNICIPIO, NOME, STATUS) VALUES (:val1, :val2, :val3, :val4)';
            await conexao.execute(sqlCriar, [codigoBairro, codigoMunicipio, nome, status]);

            await conexao.commit();

        } catch (error) {
            console.log(error);

            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async atualizar(parametros: BairroDTO): Promise<void> {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const { codigoBairro, codigoMunicipio, nome, status } = parametros;

            let sql = 'UPDATE TB_BAIRRO SET CODIGO_MUNICIPIO = :codigoMunicipio, NOME = :nome, STATUS = :status WHERE CODIGO_BAIRRO = :codigoBairro';
            let parametro = [codigoMunicipio, nome, status, codigoBairro];

            await conexao.execute(sql, parametro);

            await conexao.commit();

        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async deletar(codigoBairro: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = `DELETE FROM TB_BAIRRO WHERE CODIGO_BAIRRO = :codigoBairro`;
            const resultado = await conexao.execute(sql, [codigoBairro]);

            await conexao.commit();

            return resultado.rowsAffected;
        } catch (error) {
            conexao && await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async listar(parametros: BairroDTO) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

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

            const sql = 'SELECT * FROM TB_BAIRRO ORDER BY CODIGO_BAIRRO DESC';
            const resultado = await conexao.execute(sql);
            return resultado.rows;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async existeBairroEmMunicipio(nome: string, municipio: number, codigoBairro?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            let sql = `SELECT * FROM TB_BAIRRO WHERE NLSSORT(REPLACE(NOME, ' ', ''), 'NLS_SORT=BINARY_AI') = NLSSORT(REPLACE(:nome, ' ', ''), 'NLS_SORT=BINARY_AI') AND CODIGO_MUNICIPIO = :municipio`;
            const parametros = [nome, municipio]

            if (codigoBairro) {
                sql += ' AND CODIGO_BAIRRO <> :codigoBairro'
                parametros.push(codigoBairro);
            }

            const resultado = await conexao.execute(sql, parametros);

            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

    async existePorcodigoBairro(codigoBairro: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT * FROM TB_BAIRRO WHERE CODIGO_BAIRRO = :codigoBairro';
            const resultado = await conexao.execute(sql, { codigoBairro });

            return resultado.rows.length > 0;

        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && await conexao.close();
        }
    }

}