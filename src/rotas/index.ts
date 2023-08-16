import { Express } from 'express';
import ufRotas from "../uf/UfRotas";
import municipioRotas from '../municipio/MunicipioRotas';
import bairroRotas from '../bairro/BairroRotas';
import pessoaRotas from '../pessoa/PessoaRotas';

export const rotas = (app:Express) => {
    app.use('/', ufRotas);
    app.use('/', municipioRotas)
    app.use('/', bairroRotas)
    app.use('/', pessoaRotas)
}
