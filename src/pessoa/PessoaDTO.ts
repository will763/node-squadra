import EnderecoDTO from "../endereco/EnderecoDTO";

export default interface PessoaDTO {
    codigoPessoa: number
    nome: string,
    sobrenome: string,
    idade: number,
    login: string,
    senha: string,
    status: number,
    enderecos: EnderecoDTO[]
}