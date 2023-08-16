"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarMunicipio = void 0;
exports.deletarMunicipio = {
    "tags": ["Municipio"],
    "description": "Este endpoint é usado para deletar um Municipio.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "codigoMunicipio": {
                            "type": "number",
                            "default": 1,
                            "description": "Código do Municipio a ser deletado"
                        }
                    },
                    "required": ["codigoUF"]
                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "Sucesso",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "integer",
                        "enum": [1, 0],
                        "description": "Valor inteiro 1 representa a deleção sucesso, 0 não achou nenhum registro",
                        "default": 1
                    }
                }
            }
        },
        "400": {
            "description": "Erro de requisição",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AppError"
                    }
                }
            }
        },
        "500": {
            "description": "Erro no Servidor",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AppError"
                    }
                }
            }
        }
    }
};
