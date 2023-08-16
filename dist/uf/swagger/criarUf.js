"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarUf = void 0;
exports.criarUf = {
    "tags": ['UF'],
    "description": "Este endpoint é usado para criar uma nova UF.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
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
                            "default": 1,
                            "description": "Status da UF"
                        }
                    },
                    "required": ["sigla", "nome", "status"]
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
