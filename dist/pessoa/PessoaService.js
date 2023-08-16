"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../framework/erros/AppError"));
const PessoaDAO_1 = require("./PessoaDAO");
const BairroService_1 = __importDefault(require("../bairro/BairroService"));
const EnderecoService_1 = __importDefault(require("../endereco/EnderecoService"));
class PessoaService {
    constructor() {
        this.pessoaDAO = new PessoaDAO_1.PessoaDAO();
        this.bairroService = new BairroService_1.default();
        this.enderecoService = new EnderecoService_1.default();
    }
    criarDepoisListarTodos(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.existePessoaPorLogin(pessoa.login);
            yield this.verificarCodigoBairro(pessoa.enderecos);
            yield this.pessoaDAO.criar(pessoa);
            const resultado = yield this.pessoaDAO.listar();
            return (resultado === null || resultado === void 0 ? void 0 : resultado.length) > 0 ? resultado : [];
        });
    }
    atualizarDepoisListarTodos(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verificarEndercoRepitidos(pessoa.enderecos);
            yield this.pessoaDAO.existePessoaPorCodigoPessoa(pessoa.codigoPessoa);
            yield this.existePessoaPorLogin(pessoa.login, pessoa.codigoPessoa);
            yield this.verificarCodigoBairroECodigoPessoa(pessoa.enderecos);
            yield this.pessoaDAO.atualizar(pessoa);
            const resultado = yield this.pessoaDAO.listar();
            return (resultado === null || resultado === void 0 ? void 0 : resultado.length) > 0 ? resultado : [];
        });
    }
    listarDinamicamente(codigoPessoa, login, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!codigoPessoa && !login && !status) {
                const resultado = yield this.pessoaDAO.listar();
                return resultado.length > 0 ? resultado : [];
            }
            if (!codigoPessoa) {
                const resultado = yield this.pessoaDAO.listarDinamicamente(codigoPessoa, login, status);
                return resultado.length > 0 ? resultado : [];
            }
            const resultado = yield this.pessoaDAO.listarDinamicamente(codigoPessoa, login, status);
            return resultado.length > 0 ? resultado[0] : [];
        });
    }
    deletar(codigoPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pessoaDAO.deletar(codigoPessoa);
        });
    }
    existePessoaPorLogin(login, codigoPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoa = yield this.pessoaDAO.existePessoaPeloLogin(login, codigoPessoa);
            if (pessoa) {
                throw new AppError_1.default(`Já existe uma pessoa com o login ${login}, por favor insira outro login!`, 400);
            }
        });
    }
    existePessoaPorCodigoPessoa(codigoPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoa = yield this.pessoaDAO.existePessoaPorCodigoPessoa(codigoPessoa);
            if (!pessoa) {
                throw new AppError_1.default(`Não existe uma pessoa com o codigoPessoa ${codigoPessoa}, por favor insira um codigoPessoa válido!`, 400);
            }
        });
    }
    verificarCodigoBairro(enderecos) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const endereco of enderecos) {
                try {
                    yield this.bairroService.existePorcodigoBairro(endereco.codigoBairro);
                }
                catch (error) {
                    throw new AppError_1.default(`O codigoBairro ${endereco.codigoBairro} não existe.`, 400);
                }
            }
        });
    }
    verificarCodigoBairroECodigoPessoa(enderecos) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const endereco of enderecos) {
                try {
                    endereco.codigoEndereco && (yield this.enderecoService.existeEndereco(endereco.codigoEndereco));
                    yield this.existePessoaPorCodigoPessoa(endereco.codigoPessoa);
                    yield this.pessoaDAO.existePessoaPorCodigoPessoa(endereco.codigoEndereco);
                    yield this.bairroService.existePorcodigoBairro(endereco.codigoBairro);
                }
                catch (error) {
                    throw new AppError_1.default(error.mensagem, 400);
                }
            }
        });
    }
    endercoRepitidos(enderecos) {
        const contador = [];
        for (const endereco of enderecos) {
            if (endereco.codigoEndereco) {
                if (contador.includes(endereco.codigoEndereco)) {
                    throw new AppError_1.default('Array de endereços está com codigoEndereco iguais', 400);
                }
                else {
                    contador.push(endereco.codigoEndereco);
                }
            }
        }
    }
    verificarEndercoRepitidos(enderecos) {
        try {
            this.endercoRepitidos(enderecos);
        }
        catch (error) {
            throw new AppError_1.default(error.mensagem, 400);
        }
    }
}
exports.default = PessoaService;
