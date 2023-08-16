import { Router } from "express";
import BairroController from "./BairroController";
import ValidaBairro from "./ValidaBairro";

const controller = new BairroController();
const valida = new ValidaBairro();

const bairroRotas = Router();

bairroRotas.post('/bairro', valida.criar, controller.criar);
bairroRotas.delete('/bairro', valida.deletar, controller.deletar);
bairroRotas.get('/bairro', valida.listar, controller.listar);
bairroRotas.put('/bairro', valida.atualizar, controller.atualizar);

export default bairroRotas;