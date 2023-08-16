"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarBairroSchema = exports.atualizarBairroSchema = exports.criarBairroSchema = exports.listarBairroSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bairroSchema = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.base': 'O campo codigoBairro deve ser um número.',
    'number.min': 'O campo codigoBairro deve ser no mínimo 1',
    'number.max': 'O limite para o codigoBairro é 999999',
    'number.empty': 'O campo codigoBairro não pode estar vazio.',
    'any.required': 'O campo codigoBairro é obrigatório.',
});
const codigoMunicipioSchema = joi_1.default.number()
    .min(1)
    .max(999999)
    .messages({
    'number.base': 'O campo codigoMunicipio deve ser um número.',
    'number.min': 'O campo codigoMunicipio deve ser no mínimo 1',
    'number.max': 'O limite para o codigoMunicipio é 999999',
    'number.empty': 'O campo codigoMunicipio não pode estar vazio.',
    'any.required': 'O campo codigoMunicipio é obrigatório.',
});
const nomeSchema = joi_1.default.string()
    .min(5)
    .max(20)
    .pattern(/^[\sA-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ]+$/)
    .messages({
    'string.base': 'O campo nome deve ser uma string.',
    'string.min': 'Não existe é permitido nome com menos de 5 letras.',
    'string.max': 'O limite para nome é no máximo 20 letras.',
    'string.pattern.base': 'O campo nome deve conter apenas letras maiúsculas.',
    'string.empty': 'O campo nome não pode estar vazio.',
    'any.required': 'O campo nome é obrigatório.',
});
const statusSchema = joi_1.default.number()
    .valid(1, 2)
    .messages({
    'number.base': 'O campo status deve ser um número',
    'any.only': 'O campo status deve ser 1 ou 2',
    'any.required': 'O campo status é obrigatório',
});
exports.listarBairroSchema = joi_1.default.object({
    codigoBairro: bairroSchema,
    codigoMunicipio: codigoMunicipioSchema,
    nome: nomeSchema,
    status: statusSchema
});
exports.criarBairroSchema = joi_1.default.object({
    codigoMunicipio: codigoMunicipioSchema.required(),
    nome: nomeSchema.required(),
    status: statusSchema.required()
});
exports.atualizarBairroSchema = joi_1.default.object({
    codigoBairro: bairroSchema.required(),
    codigoMunicipio: codigoMunicipioSchema.required(),
    nome: nomeSchema.required(),
    status: statusSchema.required()
});
exports.deletarBairroSchema = joi_1.default.object({
    codigoBairro: bairroSchema.required()
});
