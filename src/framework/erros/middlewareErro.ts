import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import BancoErro from "./BancoErro";

export const middlewareErro = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof BancoErro) {

        if (error?.mensagem?.includes("invalid username/password; logon denied")) {
            const resposta = {
                mensagem: 'A senha ou usuario do banco de dados está incorreto!',
                status: 500,
            };

            return res.status(500).json(resposta);
        }

        if (error?.mensagem?.includes('ECONNREFUSED')) {
            const resposta = {
                mensagem: 'Erro de conexão com o banco de dados.',
                status: 500,
            };

            return res.status(500).json(resposta);
        }

        return res.status(500).json({
            mensagem: 'O banco não conseguiu concluir a operação.',
            status: 500,
        })
    }

    if (error instanceof AppError) {
        const resposta = {
            mensagem: error.mensagem,
            status: error.status,
            ...(error && error.nomeDoCampo && { nomeDoCampo: error.nomeDoCampo })
        };

        return res.status(error.status).json(resposta);
    }

    if (error instanceof SyntaxError) {
        if ("status" in error) {
            return res.status(error.status as number).json({
                mensagem: "Houve um problema com a sua requisição devido a um JSON incorreto, verifique se o json que você enviou e tente novamente",
                status: error.status
            });
        }
    }

    return res.status(500).json({
        mensagem: "Desculpe, o servidor não conseguiu processar sua requisição, tente novamente em alguns instantes",
        status: 500
    });
};
