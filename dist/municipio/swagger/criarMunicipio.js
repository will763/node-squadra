"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarMunicipio = void 0;
exports.criarMunicipio = {
    "tags": ['Municipio'],
    "description": "Este endpoint é usado para criar um novo Municipio.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "codigoUF": {
                            "type": "number",
                            "description": "Código da UF"
                        },
                        "nome": {
                            "type": "string",
                            "description": "Nome do município"
                        },
                        "status": {
                            "type": "number",
                            "description": "Status do município"
                        }
                    },
                    "required": ["codigoUF", "nome", "status"]
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
