import { Router } from "express";
import ValidaUf from "./ValidaUf";
import UfController from "./UfController";

const controller = new UfController();
const validaUf = new ValidaUf();

const ufRotas = Router();

ufRotas.post('/uf', validaUf.criar, controller.criarUf);
ufRotas.get('/uf', validaUf.listar, controller.listarUf);
ufRotas.put('/uf', validaUf.atualizar, controller.atualizarUf);
ufRotas.delete('/uf', validaUf.deletar, controller.deletarUf);

export default ufRotas;