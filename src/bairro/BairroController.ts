import { NextFunction, Request, Response } from "express";
import BairroDTO from "./BairroDTO";
import BairroService from "./BairroService";

interface queriesParametros extends BairroDTO{};

export class BairroController {
  
  bairroService = new BairroService();

  listar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoBairro, codigoMunicipio, nome, status } = req.query as unknown as queriesParametros;

    try {
      const result = await this.bairroService.listarMunicipioDinamicamente({codigoBairro,codigoMunicipio, nome, status});
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  criar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoMunicipio, nome , status } = req.body
    
    try {
      const result = await this.bairroService.criarDepoisListarTodos({codigoMunicipio, nome, status});
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }

  }

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoBairro, codigoMunicipio, nome, status } = req.body

    try {
      const result = await this.bairroService.atualizarDepoisListarTodos(codigoBairro,codigoMunicipio, nome, status);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    const { codigoBairro } = req.body

    try {
      const result = await this.bairroService.deletar(codigoBairro);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }
}

export default BairroController;