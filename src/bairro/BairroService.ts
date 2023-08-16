import AppError from "../framework/erros/AppError";
import { retornarArrayObjetos } from "../utils/retornarArrayObjetos";
import { BairroDAO } from "./BairroDAO";
import MunicipioService from "../municipio/MunicipioService";
import BairroDTO from "./BairroDTO";

class BairroService {
    bairroDAO = new BairroDAO();
    municipioService = new MunicipioService();

    async listarMunicipioDinamicamente(parametros: Partial<BairroDTO>) {
        const { codigoBairro, codigoMunicipio, nome, status } = parametros;

        const formatacao = ['codigoBairro', 'codigoMunicipio', 'nome', 'status'];

        if (!codigoBairro) {
            const resultado = await this.bairroDAO.listar({ codigoBairro, codigoMunicipio, nome, status });
            return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao) : []
        }

        const resultado = await this.bairroDAO.listar({ codigoBairro, codigoMunicipio, nome, status });
        return resultado.length > 0 ? retornarArrayObjetos(resultado, formatacao)[0] : []
    }

    async criarDepoisListarTodos({ codigoMunicipio, nome, status }: Partial<BairroDTO>) {

        await this.municipioService.existeCodigoMunicipio(codigoMunicipio);

        await this.existeBairroEmMunicipio(nome, codigoMunicipio);

        await this.bairroDAO.criar({ codigoMunicipio, nome, status });

        const resultado = await this.bairroDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoBairro', 'codigoMunicipio', 'nome', 'status']);
    }

    async atualizarDepoisListarTodos(codigoBairro: number, codigoMunicipio: number, nome: string, status: number) {

        await this.existePorcodigoBairro(codigoBairro);

        await this.municipioService.existeCodigoMunicipio(codigoMunicipio);

        await this.existeBairroEmMunicipio(nome, codigoMunicipio, codigoBairro);

        await this.bairroDAO.atualizar({ codigoBairro, codigoMunicipio, nome, status });

        const resultado = await this.bairroDAO.listarTodosRegistros();
        return retornarArrayObjetos(resultado, ['codigoBairro', 'codigoMunicipio', 'nome', 'status']);
    }

    async deletar(codigoBairro: number) {
        return await this.bairroDAO.deletar(codigoBairro);
    }

    async existeBairroEmMunicipio(nome: string, codigoMunicipio: number,codigoBairro?: number) {
        const existeBairroEmMunicipio = await this.bairroDAO.existeBairroEmMunicipio(nome, codigoMunicipio,codigoBairro);

        if (existeBairroEmMunicipio) {
            throw new AppError(`Já existe um bairro com o mesmo nome nesse municipio, por favor, insira um complemento.`, 400)
        }
    }

    async existePorcodigoBairro(codigoBairro:number) {
        const existePorcodigoBairro = await this.bairroDAO.existePorcodigoBairro(codigoBairro);

        if (!existePorcodigoBairro) {
            throw new AppError(`O codigoBairro ${codigoBairro} não existe.`, 400)
        }
    }

}

export default BairroService;