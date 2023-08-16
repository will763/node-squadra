import { NextFunction, Request, Response } from "express";
import MunicipioService from "./MunicipioService";
import MunicipioDTO from "./MunicipioDTO";

interface queriesParametros extends MunicipioDTO{};

export class MunicipioController {
  municipioService = new MunicipioService();

  listar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoMunicipio, codigoUF, nome, status } = req.query as unknown as queriesParametros;

    try {
      const result = await this.municipioService.listarMunicipioDinamicamente({codigoMunicipio, codigoUF, nome, status});
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  criar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoUF, nome , status } = req.body
    
    try {
      const result = await this.municipioService.criarDepoisListarTodos({codigoUF, nome, status});
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }

  }

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoMunicipio, codigoUF, nome, status } = req.body

    try {
      const result = await this.municipioService.atualizarDepoisListarTodos(codigoMunicipio, codigoUF, nome, status);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoMunicipio } = req.body

    try {
      const result = await this.municipioService.deletar(codigoMunicipio);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }
}

export default MunicipioController;