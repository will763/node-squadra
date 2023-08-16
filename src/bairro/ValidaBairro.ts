import { NextFunction, Request, Response } from "express";
import AppError from "../framework/erros/AppError";
import { atualizarBairroSchema, criarBairroSchema, deletarBairroSchema, listarBairroSchema } from "./BairroSchema";

class ValidaBairro {

    criar(req: Request, res: Response, next: NextFunction) {
        const { codigoMunicipio, nome, status } = req.body;

        const result = criarBairroSchema.validate({ codigoMunicipio, nome, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    listar(req: Request, res: Response, next: NextFunction) {
        const { codigoBairro, codigoMunicipio, nome, status } = req.query

        const result = listarBairroSchema.validate({ codigoBairro, codigoMunicipio, nome, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    atualizar(req: Request, res: Response, next: NextFunction) {
        const { codigoBairro, codigoMunicipio, nome, status } = req.body

        const result = atualizarBairroSchema.validate({ codigoBairro, codigoMunicipio, nome, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    deletar(req: Request, res: Response, next: NextFunction) {
        const { codigoBairro } = req.body

        const result = deletarBairroSchema.validate({codigoBairro});

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }


}

export default ValidaBairro;