import AppError from "../framework/erros/AppError";
import EnderecoDAO from "./EnderecoDAO"

class EnderecoService {
    enderecoDAO = new EnderecoDAO();

    async existeEndereco(codigoEndereco: number) {
        const endereco = await this.enderecoDAO.existeEndereco(codigoEndereco)

        if (!endereco) {
            throw new AppError(`Não existe uma endereco com o codigoEndereco ${codigoEndereco}, por favor insira um codigoEndereco válido!`, 400)
        }
    }
}

export default EnderecoService;