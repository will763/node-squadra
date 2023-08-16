import AppError from "../framework/erros/AppError";
import { PessoaDAO } from "./PessoaDAO";
import PessoaDTO from "./PessoaDTO";
import BairroService from "../bairro/BairroService";
import EnderecoDTO from "../endereco/EnderecoDTO";
import EnderecoService from "../endereco/EnderecoService";

class PessoaService {
    pessoaDAO = new PessoaDAO();
    bairroService = new BairroService();
    enderecoService = new EnderecoService()

    async criarDepoisListarTodos(pessoa: Partial<PessoaDTO>) {

        await this.existePessoaPorLogin(pessoa.login);

        await this.verificarCodigoBairro(pessoa.enderecos);

        await this.pessoaDAO.criar(pessoa)

        const resultado = await this.pessoaDAO.listar();

        return resultado?.length > 0 ? resultado : [];

    }

    async atualizarDepoisListarTodos(pessoa: PessoaDTO) {
       
        this.verificarEndercoRepitidos(pessoa.enderecos)

        await this.pessoaDAO.existePessoaPorCodigoPessoa(pessoa.codigoPessoa)

        await this.existePessoaPorLogin(pessoa.login, pessoa.codigoPessoa);

        await this.verificarCodigoBairroECodigoPessoa(pessoa.enderecos)

        await this.pessoaDAO.atualizar(pessoa)

        const resultado = await this.pessoaDAO.listar();

        return resultado?.length > 0 ? resultado : [];

    }

    async listarDinamicamente(codigoPessoa?: number, login?: string, status?: number) {

        if (!codigoPessoa && !login && !status) {
            const resultado = await this.pessoaDAO.listar();
            return resultado.length > 0 ? resultado : []
        }

        if (!codigoPessoa) {
            const resultado = await this.pessoaDAO.listarDinamicamente(codigoPessoa, login, status);
            return resultado.length > 0 ? resultado : []
        }

        const resultado = await this.pessoaDAO.listarDinamicamente(codigoPessoa, login, status);
        return resultado.length > 0 ? resultado[0] : []

    }

    async deletar(codigoPessoa: number) {
        return await this.pessoaDAO.deletar(codigoPessoa)
    }

    async existePessoaPorLogin(login: string, codigoPessoa?: number) {
        const pessoa = await this.pessoaDAO.existePessoaPeloLogin(login, codigoPessoa)

        if (pessoa) {
            throw new AppError(`Já existe uma pessoa com o login ${login}, por favor insira outro login!`, 400)
        }
    }

    async existePessoaPorCodigoPessoa(codigoPessoa: number) {
        const pessoa = await this.pessoaDAO.existePessoaPorCodigoPessoa(codigoPessoa)

        if (!pessoa) {
            throw new AppError(`Não existe uma pessoa com o codigoPessoa ${codigoPessoa}, por favor insira um codigoPessoa válido!`, 400)
        }
    }

    async verificarCodigoBairro(enderecos:EnderecoDTO[]) {
        for (const endereco of enderecos) {
            try {
                await this.bairroService.existePorcodigoBairro(endereco.codigoBairro);
            } catch (error) {
                throw new AppError(`O codigoBairro ${endereco.codigoBairro} não existe.`, 400)
            }
        }

    }

    async verificarCodigoBairroECodigoPessoa(enderecos:EnderecoDTO[]) {
        for (const endereco of enderecos) {
            try {
                endereco.codigoEndereco && await this.enderecoService.existeEndereco(endereco.codigoEndereco);
                await this.existePessoaPorCodigoPessoa(endereco.codigoPessoa)
                await this.pessoaDAO.existePessoaPorCodigoPessoa(endereco.codigoEndereco)
                await this.bairroService.existePorcodigoBairro(endereco.codigoBairro);
            } catch (error) {
                throw new AppError((error as AppError).mensagem, 400)
            }
        }

    }

    endercoRepitidos(enderecos:EnderecoDTO[]) {
        const contador = [];
        
        for (const endereco of enderecos) {
            if(endereco.codigoEndereco){
                if(contador.includes(endereco.codigoEndereco)){
                    throw new AppError('Array de endereços está com codigoEndereco iguais', 400)
                }else{
                    contador.push(endereco.codigoEndereco)
                }
            }
        }

    }

    verificarEndercoRepitidos(enderecos:EnderecoDTO[]){
        try {
            this.endercoRepitidos(enderecos)
        } catch (error) {
            throw new AppError((error as AppError).mensagem, 400)
        }
    }


}

export default PessoaService;