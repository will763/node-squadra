"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const middlewareErro_1 = require("./framework/erros/middlewareErro");
const index_1 = require("./rotas/index");
const swagger_1 = require("./framework/docs/swagger");
const app = (0, express_1.default)();
express_1.default.urlencoded({ extended: true });
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined'));
app.use((0, compression_1.default)());
(0, index_1.rotas)(app);
app.use(middlewareErro_1.middlewareErro);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.documentacaoApi));
const server = app.listen(3333, () => {
    console.log(`Servidor está em execução em http://localhost:3333`);
});
exports.default = server;
