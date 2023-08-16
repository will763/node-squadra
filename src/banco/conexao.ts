import oracledb from 'oracledb';

export async function conectar() {

    const conexao = await oracledb.getConnection({
        user: "C##NODE",
        password: "node",
        connectString: "localhost:1521/xe"
    })

    return conexao;
}