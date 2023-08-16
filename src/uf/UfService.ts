import AppError from "../framework/erros/AppError";
import { retornarArrayObjetos } from "../utils/retornarArrayObjetos";
import { UfDAO } from "./UfDAO";

class UfService {
    ufDAO = new UfDAO();

    async criarDepoisListarTodos(sigla: string, nome: string, status: number) {
        
        await this.existeUfNome(nome);
        
        await this.existeUfSigla(sigla)

        await this.ufDAO.criar({ sigla, nome, status });

        const resultado = await this.ufDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoUF', 'sigla', 'nome', 'status']);
    }

    async atualizarDepoisListarTodos(codigoUF: number, sigla: string, nome: string, status: number) {

        await this.existeCodigoUF(codigoUF)

        await this.existeUfNome(nome,codigoUF);

        await this.existeUfSigla(sigla,codigoUF)

        await this.ufDAO.atualizar({ codigoUF, sigla, nome, status });

        const resultado = await this.ufDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoUF', 'sigla', 'nome', 'status']);
    }

    async deletar(codigoUf: number) {
        return await this.ufDAO.deletar(codigoUf);
    }

    async listarUfDinamicamente(codigoUF: number, sigla: string, nome: string, status: number) {

        const retornaTudo = !codigoUF && !sigla && !nome && !status;
        const somenteStatus = !codigoUF && !sigla && !nome && status;
        const formatacao = ['codigoUF', 'sigla', 'nome', 'status'];

        if (retornaTudo || somenteStatus) {
            const resultado = await this.ufDAO.listar({ codigoUF, sigla, nome, status });
            return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao) : [];
        }

        const resultado = await this.ufDAO.listar({ codigoUF, sigla, nome, status });
        return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao)[0] : [];
    }

    async existeUfSigla(sigla: string,codigoUf?: number) {

        const existeSigla = await this.ufDAO.existeUfPorSigla(sigla,codigoUf);

        if (existeSigla) {
            throw new AppError(`A sigla ${sigla} já esta sendo usada`, 400);
        }
    }

    async existeUfNome(nome: string,codigoUf?: number) {
        
        const existeNome = await this.ufDAO.existeUfPorNome(nome,codigoUf);

        if (existeNome) {
            throw new AppError(`Parece que você esta tentando usar o nome ${nome}, mas esse nome já esta sendo usado.`, 400)
        }
    }

    async existeCodigoUF(codigoUF:number) {
        const existeCodigoUF = await this.ufDAO.existeUfPorcodigoUF(codigoUF);

        if (!existeCodigoUF) {
            throw new AppError(`O codigoUF ${codigoUF} não existe.`, 400)
        }
    }

}

export default UfService;