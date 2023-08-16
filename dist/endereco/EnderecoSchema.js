"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarEndereco = exports.criarEndereco = void 0;
const joi_1 = __importDefault(require("joi"));
const codigoPessoa = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.min': 'O campo codigoPessoa deve ser no mínimo 1',
    'number.base': 'O campo codigoPessoa deve ser um número',
    'number.max': 'O limite para o codigoPessoa é 999999',
    'any.required': 'O campo codigoPessoa é obrigatório',
});
const codigoEndereco = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.min': 'O campo codigoEndereco deve ser no mínimo 1',
    'number.max': 'O limite para o codigoEndereco é 999999',
    'number.base': 'O campo codigoEndereco deve ser um número',
    'any.required': 'O campo codigoEndereco é obrigatório',
});
const codigoBairro = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.min': 'O campo codigoBairro deve ser no mínimo 1',
    'number.base': 'O campo codigoBairro deve ser um número',
    'number.max': 'O limite para o codigoBairro é 999999',
    'any.required': 'O campo codigoBairro é obrigatório',
});
const nomeRua = joi_1.default.string()
    .min(3)
    .max(16)
    .uppercase()
    .empty('')
    .messages({
    'string.base': 'O campo nomeRua deve ser uma string',
    'string.max': 'O limite máximo de caracteres para o campo nomeRua é 16',
    'string.min': 'O limite mínimo de caracteres para o campo nomeRua é 3',
    'string.uppercase': 'O campo nomeRua deve estar todo em letras maiúsculas',
    'string.empty': 'O campo nomeRua não pode ser vazio',
    'any.required': 'O campo nomeRua é obrigatório',
});
const numero = joi_1.default.number()
    .min(1)
    .max(5000)
    .messages({
    'number.base': 'O campo numero deve ser um número',
    'number.min': 'O campo numero deve ser no mínimo 1',
    'number.max': 'O limite para o numero é 5000',
    'any.required': 'O campo numero é obrigatório',
});
const complemento = joi_1.default.string()
    .empty('')
    .min(3)
    .uppercase()
    .max(16)
    .messages({
    'string.base': 'O campo complemento deve ser uma string',
    'string.min': 'O limite mínimo de caracteres para o campo complemento é 3',
    'string.max': 'O limite máximo de caracteres para o campo complemento é 16',
    'string.uppercase': 'O campo complemento deve estar todo em letras maiúsculas',
    'string.empty': 'O campo complemento não pode ser vazio',
    'any.required': 'O campo complemento é obrigatório',
});
const cep = joi_1.default.string()
    .pattern(/^\d{5}-\d{3}$/)
    .empty('')
    .messages({
    'string.pattern.base': 'O campo cep deve ter o formato 12345-678',
    'string.base': 'O campo cep deve ser uma string',
    'string.empty': 'O campo cep não pode ser vazio',
    'any.required': 'O campo cep é obrigatório',
});
exports.criarEndereco = {
    codigoBairro: codigoBairro.required(),
    nomeRua: nomeRua.required(),
    numero: numero.required(),
    complemento: complemento.required(),
    cep: cep.required()
};
exports.atualizarEndereco = {
    codigoEndereco,
    codigoPessoa: codigoPessoa.required(),
    codigoBairro: codigoBairro.required(),
    nomeRua: nomeRua.required(),
    numero: numero.required(),
    complemento: complemento.required(),
    cep: cep.required()
};
