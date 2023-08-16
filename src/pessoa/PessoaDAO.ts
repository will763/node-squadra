import BancoErro from "../framework/erros/BancoErro";
import { conectar } from "../banco/conexao";
import { AbstractDao } from "../framework/AbstractDAO";
import PessoaDTO from "./PessoaDTO";
import OracleDB from "oracledb";

export class PessoaDAO extends AbstractDao<PessoaDTO> {

    constructor() {
        super();
    }

    async criar(parametros: Partial<PessoaDTO>) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const { nome, sobrenome, idade, login, senha, status, enderecos } = parametros;

            const resultadoPessoa = await conexao.execute('SELECT SEQUENCE_PESSOA.NEXTVAL AS CODIGO FROM DUAL');
            const codigoPessoa = resultadoPessoa.rows?.[0]?.[0];

            const sqlPessoa = `
               INSERT INTO TB_PESSOA (CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS)
               VALUES (:val1, :val2, :val3, :val4,:val5,:val6,:val7)`;

            await conexao.execute(sqlPessoa, [
                codigoPessoa,
                nome,
                sobrenome,
                idade,
                login,
                senha,
                status,
            ]);

            for (const endereco of enderecos) {
                const resultadoEndereco = await conexao.execute('SELECT SEQUENCE_ENDERECO.NEXTVAL AS CODIGO FROM DUAL');
                const codigoEndereco = resultadoEndereco.rows?.[0]?.[0];

                const sqlEndereco = `
                  INSERT INTO TB_ENDERECO (CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP)
                  VALUES (:codigoEndereco, :codigoPessoa, :codigoBairro, :nomeRua, :numero, :complemento, :cep)`;

                await conexao.execute(sqlEndereco, {
                    codigoEndereco,
                    codigoPessoa,
                    codigoBairro: endereco.codigoBairro,
                    nomeRua: endereco.nomeRua,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                });
            }

            await conexao.commit();
        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }

    async listar() {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const resultado = await conexao.execute(
                'SELECT CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS FROM TB_PESSOA ORDER BY CODIGO_PESSOA DESC'
            );

            const pessoas = resultado.rows.map((row: any) => ({
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

        } catch (error) {
            throw new BancoErro((error as Error).message, 500)
        } finally {
            conexao && await conexao.close();
        }
    }

    async listarDinamicamente(codigoPessoa?: number, login?: string, status?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            if(!codigoPessoa){
                let sql = `SELECT CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS FROM TB_PESSOA WHERE 1 = 1`;
                const parametros: unknown[] = [];

                if (login) {
                    sql += ' AND LOGIN = :login';
                    parametros.push(login);
                }
    
                if (status) {
                    sql += ' AND STATUS = :status';
                    parametros.push(status);
                }

                sql +=' ORDER BY CODIGO_PESSOA DESC';

                console.log(sql);

                const resultado = await conexao.execute(sql,parametros)

                const pessoas = resultado.rows.map((row: any) => ({
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
            
            const resultado = await conexao.execute(sql, parametros);    

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

            const pessoas = resultado.rows.map((row: any) => ({
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
        } catch (error) {
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }


    async deletar(codigoPessoa: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa`;
            await conexao.execute(sqlEndereco, [codigoPessoa]);

            const sqlPessoa = `DELETE FROM TB_PESSOA WHERE CODIGO_PESSOA = :codigoPessoa`;
            const resultado = await conexao.execute(sqlPessoa, [codigoPessoa]);

            await conexao.commit();

            return resultado.rowsAffected
        } catch (error) {
            conexao && await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }

    async atualizar(pessoa: PessoaDTO) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const manterEndereco: number[] = pessoa?.enderecos
                .filter((endereco) => endereco?.codigoEndereco)
                .map((endereco) => endereco?.codigoEndereco);

            if(manterEndereco?.length > 0){
                const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa AND CODIGO_ENDERECO NOT IN (${manterEndereco.join(',')})`;
                await conexao.execute(sqlEndereco,[pessoa.codigoPessoa]);   
            }else {
                const sqlEndereco = `DELETE FROM TB_ENDERECO WHERE CODIGO_PESSOA = :codigoPessoa`;
                await conexao.execute(sqlEndereco,[pessoa.codigoPessoa]);  
            }

            const { nome, sobrenome, idade, login, senha, status, codigoPessoa } = pessoa;

            const sql = 'UPDATE TB_PESSOA SET NOME = :nome, SOBRENOME = :sobrenome, IDADE = :idade, LOGIN = :login, SENHA = :senha, STATUS = :status WHERE CODIGO_PESSOA = :codigoPessoa';
            const parametros = [nome, sobrenome, idade, login, senha, status, codigoPessoa];

            await conexao.execute(sql, parametros);

            for (const endereco of pessoa?.enderecos) {

                const { codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, codigoEndereco } = endereco;

                if (!endereco?.codigoEndereco) {
                    const resultadoEndereco = await conexao.execute('SELECT SEQUENCE_ENDERECO.NEXTVAL AS CODIGO FROM DUAL');
                    const codigoEndereco = resultadoEndereco.rows?.[0]?.[0];

                    const sqlEndereco = `
                      INSERT INTO TB_ENDERECO (CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP)
                      VALUES (:codigoEndereco, :codigoPessoa, :codigoBairro, :nomeRua, :numero, :complemento, :cep)`;

                    const parametros = [codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep];

                    await conexao.execute(sqlEndereco, parametros);
                }

                if (endereco?.codigoEndereco) {
                    const sql = 'UPDATE TB_ENDERECO SET CODIGO_PESSOA = :codigoPessoa, CODIGO_BAIRRO = :codigoBairro, NOME_RUA = :nomeRua, NUMERO = :numero, COMPLEMENTO = :complemento, CEP = :cep WHERE CODIGO_ENDERECO = :codigoEndereco';
                    const parametros = [codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, codigoEndereco];

                    await conexao.execute(sql, parametros);
                }
            }

            await conexao.commit();

        } catch (error) {
            console.log(error);
            
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }

    async existePessoaPeloLogin(login: string, codigoPessoa?: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            let sql = `SELECT COUNT(*) FROM TB_PESSOA WHERE TRIM(UPPER(LOGIN)) = TRIM(UPPER(:login))`;
            const parametros: unknown[] = [login]


            if (codigoPessoa) {
                sql += ' AND CODIGO_PESSOA <> :codigoPessoa'
                parametros.push(codigoPessoa);
            }


            const resultado = await conexao.execute(sql, parametros);

            const count = resultado.rows?.[0]?.[0];
            return count > 0;
        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }

    async existePessoaPorCodigoPessoa(codigoPessoa: number) {
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT COUNT(*) FROM TB_PESSOA WHERE CODIGO_PESSOA = :codigoPessoa';
            const resultado = await conexao.execute(sql, { codigoPessoa });

            const count = resultado.rows?.[0]?.[0];
            return count > 0;
        } catch (error) {
            await conexao.rollback();
            throw new BancoErro((error as Error).message, 500);
        } finally {
            conexao && (await conexao.close());
        }
    }


}