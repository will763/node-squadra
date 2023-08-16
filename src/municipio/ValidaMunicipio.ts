import { NextFunction, Request, Response } from "express";
import AppError from "../framework/erros/AppError";
import { atualizarMunicipioSchema, criarMunicipioSchema, deletarMunicipioSchema, listarMunicipioSchema } from "./MunicipioSchema";

class ValidaMunicipio {

    listar(req: Request, res: Response, next: NextFunction) {
        const { codigoMunicipio, codigoUF, nome, status } = req.query
        const corpoRequisicao = { codigoMunicipio, codigoUF, nome, status };

        const result = listarMunicipioSchema.validate(corpoRequisicao);

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    criar(req: Request, res: Response, next: NextFunction) {
        const { codigoUF, nome, status } = req.body;
        
        const result = criarMunicipioSchema.validate({ codigoUF, nome, status });
        
        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }
    

    atualizar(req: Request, res: Response, next: NextFunction) {
        const { codigoMunicipio, codigoUF, nome, status } = req.body

        const result = atualizarMunicipioSchema.validate({ codigoMunicipio, codigoUF, nome, status });

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }

    deletar(req: Request, res: Response, next: NextFunction) {
        const { codigoMunicipio } = req.body

        const result = deletarMunicipioSchema.validate({codigoMunicipio});

        if (result.error) {
            const mensagem = result.error.details[0].message;
            const nomeDoCampo = result.error.details[0].context.key

            throw new AppError(mensagem, 400, nomeDoCampo);
        }

        next();
    }


}

export default ValidaMunicipio;