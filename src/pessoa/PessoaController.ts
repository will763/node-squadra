import { NextFunction, Request, Response } from "express";
import PessoaService from "./PessoaService";
import PessoaDTO from "./PessoaDTO";

interface queriesParametros extends PessoaDTO{};

export class PessoaController {

    pessoaService = new PessoaService();

    criar = async (req: Request, res: Response, next: NextFunction) => {
        const { nome, sobrenome, idade, login, senha, status, enderecos } = req.body

        try {
            const result = await this.pessoaService.criarDepoisListarTodos({ nome, sobrenome, idade, login, senha, status, enderecos });
            res.status(200).json(result)
        } catch (error) {
            next(error);
        }

    }

    atualizar = async (req: Request, res: Response, next: NextFunction) => {
        const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = req.body;

        try {
            const result = await this.pessoaService.atualizarDepoisListarTodos({ codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos  });
            res.status(200).json(result)
        } catch (error) {
            next(error);
        }

    }

    listar = async (req: Request, res: Response, next: NextFunction) => {
        const { codigoPessoa, login, status } = req.query as unknown as queriesParametros;

        try {
            const result = await this.pessoaService.listarDinamicamente( codigoPessoa, login, status );
            res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }

    deletar = async (req: Request, res: Response, next: NextFunction) => {
        const { codigoPessoa } = req.body;

        try {
            const result = await this.pessoaService.deletar(codigoPessoa);
            res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }
}

export default PessoaController;