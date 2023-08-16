import { Router } from "express";
import MunicipioController from "./MunicipioController";
import ValidaMunicipio from "./ValidaMunicipio";

const controller = new MunicipioController();
const validaMunicipio = new ValidaMunicipio();

const municipioRotas = Router();

municipioRotas.post('/municipio',validaMunicipio.criar, controller.criar);
municipioRotas.delete('/municipio',validaMunicipio.deletar, controller.deletar);
municipioRotas.put('/municipio', validaMunicipio.atualizar ,controller.atualizar);
municipioRotas.get('/municipio', validaMunicipio.listar, controller.listar)

export default municipioRotas;