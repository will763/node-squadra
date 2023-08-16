"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarUf = void 0;
exports.listarUf = {
    "tags": ["UF"],
    "description": "Este endpoint é usado para listar as UFs.",
    "parameters": [
        {
            "in": "query",
            "name": "codigoUF",
            "schema": {
                "type": "number",
                "description": "Código da UF"
            }
        },
        {
            "in": "query",
            "name": "sigla",
            "schema": {
                "type": "string",
                "description": "Sigla da UF"
            }
        },
        {
            "in": "query",
            "name": "nome",
            "schema": {
                "type": "string",
                "description": "Nome da UF"
            }
        },
        {
            "in": "query",
            "name": "status",
            "schema": {
                "type": "number",
                "description": "Status da UF"
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
                            "$ref": "#/components/schemas/Uf"
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
