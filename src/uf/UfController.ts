import { NextFunction, Request, Response } from "express";
import UfService from "./UfService"
import { UfDTO } from "./UfDTO";

interface queriesParametros extends UfDTO{};

export class UfController {

  ufService = new UfService();

  criarUf = async (req: Request, res: Response, next: NextFunction) => {
    const { sigla, nome, status } = req.body

    try {
      const result = await this.ufService.criarDepoisListarTodos(sigla, nome, status);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }

  }

  listarUf = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoUF, sigla, nome, status } = req.query as unknown as queriesParametros;

    try {
      const result = await this.ufService.listarUfDinamicamente(codigoUF, sigla, nome, status);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  atualizarUf = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoUF, sigla, nome, status } = req.body

    try {
      const result = await this.ufService.atualizarDepoisListarTodos(codigoUF, sigla, nome, status);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  deletarUf = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoUF } = req.body
    
    try {
      const result = await this.ufService.deletar(codigoUF);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }
}

export default UfController;