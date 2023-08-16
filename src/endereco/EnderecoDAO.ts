import OracleDB from "oracledb";
import { conectar } from "../banco/conexao";
import BancoErro from "../framework/erros/BancoErro";

class EnderecoDAO {
    
    async existeEndereco(codigoEndereco:number) {
    
        let conexao: OracleDB.Connection;

        try {
            conexao = await conectar();

            const sql = 'SELECT COUNT(*) FROM TB_ENDERECO WHERE CODIGO_ENDERECO = :codigoEndereco';
            const resultado = await conexao.execute(sql, { codigoEndereco });

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

export default EnderecoDAO;