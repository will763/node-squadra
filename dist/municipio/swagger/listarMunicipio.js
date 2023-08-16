"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarMunicipio = void 0;
exports.listarMunicipio = {
    "tags": ["Municipio"],
    "description": "Este endpoint é usado para listar os municipios.",
    "parameters": [
        {
            "in": "query",
            "name": "codigoMunicipio",
            "schema": {
                "type": "number",
                "description": "CodigoMunicipio do Municipio"
            }
        },
        {
            "in": "query",
            "name": "codigoUF",
            "schema": {
                "type": "number",
                "description": "Código do Municipio"
            }
        },
        {
            "in": "query",
            "name": "nome",
            "schema": {
                "type": "string",
                "description": "Nome do Municipio"
            }
        },
        {
            "in": "query",
            "name": "status",
            "schema": {
                "type": "number",
                "description": "Status do Municipio"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "Sucesso",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Municipio"
                        }
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
