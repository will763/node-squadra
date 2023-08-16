import { Router } from "express";
import PessoaController from "./PessoaController";
import ValidaPessoa from "./ValidaPessoa";

const controller = new PessoaController();
const valida = new ValidaPessoa();

const pessoaRotas = Router();

pessoaRotas.post('/pessoa', valida.criar, controller.criar);
pessoaRotas.get('/pessoa', valida.listar, controller.listar);
pessoaRotas.delete('/pessoa', valida.deletar, controller.deletar);
pessoaRotas.put('/pessoa', valida.atualizar, controller.atualizar);

export default pessoaRotas;