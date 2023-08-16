import { NextFunction, Request, Response } from "express";
import { criarUfSchema, deletarUfSchema, atualizarUfSchema, listarUfSchema } from "./UfSchema";
import AppError from "../framework/erros/AppError";

class ValidaUf {

    listar(req: Request, res: Response, next: NextFunction) {
        const { codigoUF, sigla, nome, status } = req.query

        const result = listarUfSchema.validate({ codigoUF, sigla, nome, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    criar(req: Request, res: Response, next: NextFunction) {
        const { nome, sigla, status } = req.body;

        const result = criarUfSchema.validate({ nome, sigla, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    atualizar(req: Request, res: Response, next: NextFunction) {
        const { codigoUF, sigla, nome, status } = req.body;

        const result = atualizarUfSchema.validate({ codigoUF, nome, sigla, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    deletar(req: Request, res: Response, next: NextFunction) {
        const { codigoUF } = req.body

        const result = deletarUfSchema.validate({codigoUF});

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }


}

export default ValidaUf;