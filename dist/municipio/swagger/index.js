"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarMunicipio = exports.criarMunicipio = exports.listarMunicipio = exports.atualizarMunicipio = void 0;
exports.atualizarMunicipio = {
    "tags": ['Municipio'],
    "description": "Este endpoint é usado para atualizar um Municipio.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/Municipio"
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
                    "required": ["codigoMunicipio"]
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
