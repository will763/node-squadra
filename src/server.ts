import express, { Express } from 'express';
import morgan from "morgan";
import cors from 'cors';
import compression from 'compression';
import swaggerUi from "swagger-ui-express";
import { middlewareErro }  from './framework/erros/middlewareErro';
import { rotas } from './rotas/index';
import { documentacaoApi } from './framework/docs/swagger';

const app: Express = express();

express.urlencoded({ extended: true })

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(morgan('combined'));
app.use(compression())

rotas(app);

app.use(middlewareErro);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(documentacaoApi));

const server = app.listen(3333, () => {
  console.log(`Servidor está em execução em http://localhost:3333`)
});

export default server;