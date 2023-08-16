"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUf = exports.listarUf = exports.criarUf = exports.atualizarUf = void 0;
exports.atualizarUf = {
    "tags": ["UF"],
    "description": "Este endpoint é usado para atualizar uma UF.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/Uf"
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
exports.deletarUf = {
    "tags": ["UF"],
    "description": "Este endpoint é usado para deletar uma UF.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "codigoUF": {
                            "type": "number",
                            "default": 1,
                            "description": "Código da UF a ser deletada"
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
