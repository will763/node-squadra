import { atualizarPessoa, criarPessoa, deletarPessoa, listarPessoa } from '../../pessoa/swagger';
import { criarBairro, deletarBairro, atualizarBairro, listarBairro } from '../../bairro/swagger';
import { criarMunicipio, atualizarMunicipio, deletarMunicipio, listarMunicipio } from '../../municipio/swagger/index'
import { atualizarUf, listarUf, criarUf, deletarUf } from "../../uf/swagger/index";

const documentacaoApi = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Desafio Squadra',
    description: 'Desenvolvimento de api rest em nodejs, que realiaza operações crud para as entidades: UF, Municipio, Bairro e pessoa.',
    contact: {
      name: 'William Lisboa',
      email: 'williamlisboa@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  paths: {
    '/uf': {
      post: criarUf,
      get: listarUf,
      put: atualizarUf,
      delete: deletarUf,
    },
    '/municipio': {
      post: criarMunicipio,
      get: listarMunicipio,
      put: atualizarMunicipio,
      delete: deletarMunicipio,
    },
    '/bairro': {
      post: criarBairro,
      get: listarBairro,
      put: atualizarBairro,
      delete: deletarBairro,
    },
    '/pessoa': {
      post: criarPessoa,
      get: listarPessoa,
      put: atualizarPessoa,
      delete: deletarPessoa
    }
  },
  components: {
    schemas: {
      "Pessoa": {
        "type": "object",
        "properties": {
          "codigoPessoa": {
            "type": "number"
          },
          "nome": {
            "type": "string"
          },
          "sobrenome": {
            "type": "string"
          },
          "idade": {
            "type": "number"
          },
          "login": {
            "type": "string"
          },
          "senha": {
            "type": "string"
          },
          "status": {
            "type": "number"
          },
          "enderecos": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Endereco"
            }
          }
        },
        "required": ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status", "enderecos"]
      },
      "Uf": {
        "type": "object",
        "properties": {
          "codigoUF": {
            "type": "number",
            "description": "Código da UF"
          },
          "sigla": {
            "type": "string",
            "description": "Sigla da UF"
          },
          "nome": {
            "type": "string",
            "description": "Nome da UF"
          },
          "status": {
            "type": "number",
            "description": "Status da UF"
          }
        },
        "required": ["codigoUF", "sigla", "nome", "status"]
      },
      "Municipio": {
        "type": "object",
        "properties": {
          "codigoMunicipio": {
            "type": "number"
          },
          "codigoUF": {
            "type": "number"
          },
          "nome": {
            "type": "string"
          },
          "status": {
            "type": "number"
          }
        },
        "required": ["codigoMunicipio", "codigoUF", "nome", "status"],
      },
      "Bairro": {
        "type": "object",
        "properties": {
          "codigoBairro": {
            "type": "number",
            "example": 1,
          },
          "codigoMunicipio": {
            "type": "number",
            "example": 1,
          },
          "nome": {
            "type": "string",
            "example": "Nome do Bairro",
          },
          "status": {
            "type": "number",
            "example": 1,
          },
        },
        "required": ["codigoBairro", "codigoMunicipio", "nome", "status"],
      },
      "Endereco": {
        "type": "object",
        "properties": {
          "codigoEndereco": {
            "type": "number"
          },
          "codigoPessoa": {
            "type": "number"
          },
          "codigoBairro": {
            "type": "number"
          },
          "nomeRua": {
            "type": "string"
          },
          "numero": {
            "type": "number"
          },
          "complemento": {
            "type": "string"
          },
          "cep": {
            "type": "string",
            "pattern": "^[0-9]{5}-[0-9]{3}$"
          }
        },
        "required": ["codigoEndereco", "codigoPessoa", "codigoBairro", "nomeRua", "numero", "cep"]
      },
      "AppError": {
        "type": "object",
        "properties": {
          "mensagem": {
            "type": "string",
            "description": "Mensagem de erro"
          },
          "status": {
            "type": "number",
            "description": "Status de erro"
          }
        },
        "required": ["mensagem"]
      }
    },
  },
};


export { documentacaoApi }