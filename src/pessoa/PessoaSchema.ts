import Joi from "joi";
import { atualizarEndereco, criarEndereco } from "../endereco/EnderecoSchema";

const codigoPessoa = Joi.number()
    .min(1)
    .max(999999)
    .messages({
        'number.base': 'O campo codigoPessoa deve ser um número',
        'number.min': 'O campo codigoPessoa deve ser um número no mínimo 1',
        'number.max': 'O limite máximo de caracteres para o campo codigoPessoa é 999999',
        'any.required': 'O campo codigoPessoa é obrigatório',
    });

const nome = Joi.string()
    .min(3)
    .max(40)
    .uppercase()
    .messages({
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve conter pelo menos 3 caracteres',
        'string.max': 'O limite máximo de caracteres para o campo nome é 40',
        'string.uppercase': 'O campo nome deve estar todo em letras maiúsculas',
        'any.required': 'O campo nome é obrigatório',
    });

const sobrenome = Joi.string()
    .min(3)
    .max(40)
    .uppercase()
    .messages({
        'string.empty': 'O campo sobrenome não pode estar vazio',
        'string.min': 'O campo sobrenome deve conter pelo menos 3 caracteres',
        'string.max': 'O limite máximo de caracteres para o campo sobrenome é 40',
        'string.uppercase': 'O campo sobrenome deve estar todo em letras maiúsculas',
        'any.required': 'O campo sobrenome é obrigatório',
    });

const idade = Joi.number()
    .min(1)
    .max(200)
    .messages({
        'number.base': 'O campo idade deve ser um número',
        'number.min': 'O campo idade deve ser no mínimo 1',
        'number.max': 'O limite máximo para o campo idade é 200',
        'any.required': 'O campo idade é obrigatório',
    });

const login = Joi.string()
    .min(8)
    .max(40)
    .empty('')
    .messages({
        'string.min': 'O login deve ter no mínimo 8 caracteres',
        'string.max': 'O limite máximo de caracteres para o campo login é 40',
        'any.required': 'O campo login é obrigatório',
        'string.empty': 'O campo login não pode ser vazio',
    });

const senha = Joi.string()
    .min(8)
    .max(40)
    .empty('')
    .messages({
        'string.min': 'A senha deve ter no mínimo 8 caracteres',
        'string.max': 'O limite máximo de caracteres para o campo senha é 40',
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser vazio',
    });

const status = Joi.number()
    .valid(1, 2)
    .messages({
        'number.base': 'O campo status deve ser um número',
        'any.only': 'O campo status deve ser 1 ou 2',
        'any.required': 'O campo status é obrigatório',
    });

const statusListar = Joi.number()
    .valid(1, 2)
    .messages({
        'number.base': 'O campo status deve ser um número',
        'any.only': 'O campo status deve ser 1 ou 2',
        'any.required': 'O campo status é obrigatório',
    });

const enderecosCriar = Joi.array()
    .items(criarEndereco)
    .min(1)
    .messages({
        'array.min': 'É necessário fornecer pelo menos um endereço',
        'array.base': 'O campo enderecos deve ser um array',
        'any.required': 'O campo enderecos é obrigatório',
    });

const enderecosAtualizar = Joi.array()
    .items(atualizarEndereco)
    .min(1)
    .messages({
        'array.min': 'É necessário fornecer pelo menos um endereço',
        'array.base': 'O campo enderecos deve ser um array',
        'any.required': 'O campo enderecos é obrigatório',
    });

export const criarPessoa = Joi.object({
    nome: nome.required(),
    sobrenome: sobrenome.required(),
    idade: idade.required(),
    login: login.required(),
    senha: senha.required(),
    status: status.required(),
    enderecos: enderecosCriar.required()
});

export const atualizarPessoa = Joi.object({
    codigoPessoa: codigoPessoa.required(),
    nome: nome.required(),
    sobrenome: sobrenome.required(),
    idade: idade.required(),
    login: login.required(),
    senha: senha.required(),
    status: status.required(),
    enderecos: enderecosAtualizar.required()
});

export const deletarPessoa = Joi.object({
    codigoPessoa: codigoPessoa.required()
});

export const listarPessoa = Joi.object({
    codigoPessoa,
    login,
    status
});