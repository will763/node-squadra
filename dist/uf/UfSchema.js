"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUfSchema = exports.atualizarUfSchema = exports.criarUfSchema = exports.listarUfSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const codigoUfSchema = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.base': 'O campo codigoUF deve ser um número.',
    'number.min': 'O campo codigoUF deve ser no mínimo 1',
    'number.max': 'O limite para o codigoUF é 999999',
    'number.empty': 'O campo codigoUF não pode estar vazio.',
    'any.required': 'O campo codigoUF é obrigatório.',
});
const nomeSchema = joi_1.default.string()
    .min(4)
    .max(16)
    .pattern(/^[\sA-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ]+$/)
    .messages({
    'string.base': 'O campo nome de Uf deve ser uma string.',
    'string.min': 'Não existe nome de Uf com menos de 4 letras.',
    'string.max': 'Não existe nome de Uf com mais de 16 letras.',
    'string.pattern.base': 'O campo nome deve conter apenas letras maiúsculas.',
    'string.empty': 'O campo nome não pode estar vazio.',
    'any.required': 'O campo nome é obrigatório.',
});
const siglaSchema = joi_1.default.string()
    .length(2)
    .pattern(/^[A-Z]+$/)
    .messages({
    'string.base': 'O campo sigla deve ser uma string.',
    'string.length': 'O campo sigla deve conter exatamente duas letras',
    'string.pattern.base': 'O campo sigla deve estar em letras maiúsculas.',
    'string.empty': 'O campo sigla não pode estar vazio.',
    'any.required': 'O campo sigla é obrigatório.',
});
const statusSchema = joi_1.default.number()
    .valid(1, 2)
    .messages({
    'number.base': 'O campo status deve ser um número',
    'any.only': 'O campo status deve ser 1 ou 2',
    'any.required': 'O campo status é obrigatório',
});
exports.listarUfSchema = joi_1.default.object({
    codigoUF: codigoUfSchema,
    nome: nomeSchema,
    sigla: siglaSchema,
    status: statusSchema,
});
exports.criarUfSchema = joi_1.default.object({
    nome: nomeSchema.required(),
    sigla: siglaSchema.required(),
    status: statusSchema.required()
});
exports.atualizarUfSchema = joi_1.default.object({
    codigoUF: codigoUfSchema.required(),
    nome: nomeSchema.required(),
    sigla: siglaSchema.required(),
    status: statusSchema.required(),
});
exports.deletarUfSchema = joi_1.default.object({
    codigoUF: codigoUfSchema.required()
});
