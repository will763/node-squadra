import Joi from "joi";

const codigoMunicipioSchema = Joi.number()
    .min(1)
    .max(999999)
    .messages({
        'number.base': 'O campo codigoMunicipio deve ser um número.',
        'number.min': 'O campo codigoMunicipio deve ser no mínimo 1',
        'number.max': 'O limite para o codigoMunicipio é 999999',
        'number.empty': 'O campo codigoMunicipio não pode estar vazio.',
        'any.required': 'O campo codigoMunicipio é obrigatório.',
    })

const codigoUfSchema = Joi.number()
    .min(1)
    .max(999999)
    .messages({
        'number.base': 'O campo codigoUF deve ser um número.',
        'number.min': 'O campo codigoUF deve ser no mínimo 1',
        'number.max': 'O limite para o codigoUF é 999999',
        'number.empty': 'O campo codigoUF não pode estar vazio.',
        'any.required': 'O campo codigoUF é obrigatório.',
    })

const nomeSchema = Joi.string()
    .min(5)
    .max(20)
    .pattern(/^[\sA-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ]+$/)
    .messages({
        'string.base': 'O campo nome deve ser uma string.',
        'string.min': 'Não existe nome de municipio com menos de 5 letras.',
        'string.max': 'Não existe nome municipio com mais de 20 letras.',
        'string.pattern.base': 'O campo nome deve conter apenas letras maiúsculas.',
        'string.empty': 'O campo nome não pode estar vazio.',
        'any.required': 'O campo nome é obrigatório.',
    });

const statusSchema = Joi.number()
    .valid(1, 2)
    .messages({
        'number.base': 'O campo status deve ser um número',
        'any.only': 'O campo status deve ser 1 ou 2',
        'any.required': 'O campo status é obrigatório',
    });

export const listarMunicipioSchema = Joi.object({
    codigoMunicipio: codigoMunicipioSchema,
    codigoUF: codigoUfSchema,
    nome: nomeSchema,
    status: statusSchema,
});

export const criarMunicipioSchema = Joi.object({
    codigoUF: codigoUfSchema.required(),
    nome: nomeSchema.required(),
    status: statusSchema.required()
});

export const atualizarMunicipioSchema = Joi.object({
    codigoMunicipio: codigoMunicipioSchema.required(),
    codigoUF: codigoUfSchema.required(),
    nome: nomeSchema.required(),
    status: statusSchema.required(),
})

export const deletarMunicipioSchema = Joi.object({
    codigoMunicipio: codigoMunicipioSchema.required()
})
