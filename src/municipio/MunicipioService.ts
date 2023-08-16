import UfService from "../uf/UfService";
import AppError from "../framework/erros/AppError";
import { retornarArrayObjetos } from "../utils/retornarArrayObjetos";
import { MunicipioDAO } from "./MunicipioDAO";
import MunicipioDTO from "./MunicipioDTO";

class MunicipioService {
    municipioDAO = new MunicipioDAO();
    ufService = new UfService();

    async listarMunicipioDinamicamente(parametros: Partial<MunicipioDTO>) {
        const { codigoMunicipio, codigoUF, nome, status } = parametros;

        const formatacao = ['codigoMunicipio', 'codigoUF', 'nome', 'status'];

        if (codigoMunicipio) {
            const resultado = await this.municipioDAO.listar({ codigoMunicipio, codigoUF, nome, status });
            return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao)[0] : []
        }

        const resultado = await this.municipioDAO.listar({ codigoMunicipio, codigoUF, nome, status });
        return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao) : []
    }

    async criarDepoisListarTodos({ codigoUF, nome, status }: Partial<MunicipioDTO>) {

        await this.ufService.existeCodigoUF(codigoUF);

        await this.existeMunicipioEmUf(nome, codigoUF);

        await this.municipioDAO.criar({ codigoUF, nome, status });

        const resultado = await this.municipioDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoMunicipio', 'codigoUF', 'nome', 'status']);
    }

    async atualizarDepoisListarTodos(codigoMunicipio: number, codigoUF: number, nome: string, status: number) {

        await this.existeCodigoMunicipio(codigoMunicipio);

        await this.ufService.existeCodigoUF(codigoUF);

        await this.existeMunicipioEmUf(nome, codigoUF,codigoMunicipio);

        await this.municipioDAO.atualizar({ codigoMunicipio, codigoUF, nome, status });

        const resultado = await this.municipioDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoMunicipio', 'codigoUF', 'nome', 'status']);
    }

    async deletar(codigoMunicipio: number) {
        return await this.municipioDAO.deletar(codigoMunicipio);
    }

    async existeMunicipioEmUf(nome: string, codigoUF: number,codigoMunicipio?:number ) {
        const existeMunicipioEmUf = await this.municipioDAO.existeMunicipioEmUf(nome, codigoUF, codigoMunicipio);

        if (existeMunicipioEmUf) {
            throw new AppError(`Já existe um municipio com o mesmo nome nesse UF, por favor, insira um complemento.`, 400)
        }
    }

    async existeCodigoMunicipio(codigoMunicipio:number) {
        const existeCodigoMunicipio = await this.municipioDAO.existePorcodigoMunicipio(codigoMunicipio);

        if (!existeCodigoMunicipio) {
            throw new AppError(`O codigoMunicipio ${codigoMunicipio} não existe.`, 400)
        }
    }

}

export default MunicipioService;