import { NextFunction, Request, Response } from "express";
import AppError from "../framework/erros/AppError";
import { atualizarPessoa, criarPessoa, deletarPessoa, listarPessoa } from "./PessoaSchema";

class ValidaPessoa {

    criar(req: Request, res: Response, next: NextFunction) {
        const { nome, sobrenome, idade, login, senha, status, enderecos } = req.body;

        const result = criarPessoa.validate({ nome, sobrenome, idade, login, senha, status, enderecos });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    atualizar(req: Request, res: Response, next: NextFunction) {
        const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = req.body;

        const result = atualizarPessoa.validate({ codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    listar(req: Request, res: Response, next: NextFunction) {
        const { codigoPessoa, login, status } = req.query

        const result = listarPessoa.validate({ codigoPessoa, login, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    deletar(req: Request, res: Response, next: NextFunction) {
        const { codigoPessoa } = req.body

        const result = deletarPessoa.validate({ codigoPessoa });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }


}

export default ValidaPessoa;