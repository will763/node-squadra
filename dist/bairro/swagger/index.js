"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarBairro = exports.listarBairro = exports.deletarBairro = exports.atualizarBairro = void 0;
exports.atualizarBairro = {
    "tags": ['Bairro'],
    "description": "Este endpoint é usado para atualizar um Bairro.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "required": ["codigoMunicipio", "nome", "status"],
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
                        }
                    },
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
                            "$ref": "#/components/schemas/Bairro"
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
exports.deletarBairro = {
    "tags": ["Bairro"],
    "description": "Este endpoint é usado para deletar um Bairro.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "codigoBairro": {
                            "type": "number",
                            "default": 1,
                            "description": "Código do Bairro a ser deletado"
                        }
                    },
                    "required": ["codigoBairro"]
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
exports.listarBairro = {
    "tags": ["Bairro"],
    "description": "Este endpoint é usado para liatar bairros.",
    "parameters": [
        {
            "in": "query",
            "name": "codigoBairro",
            "schema": {
                "type": "number",
                "description": "codigo do Bairro"
            }
        },
        {
            "in": "query",
            "name": "codigoMunicipio",
            "schema": {
                "type": "number",
                "description": "Codigo do Municipio"
            }
        },
        {
            "in": "query",
            "name": "nome",
            "schema": {
                "type": "string",
                "description": "Nome do Bairro"
            }
        },
        {
            "in": "query",
            "name": "status",
            "schema": {
                "type": "number",
                "description": "Status do Bairro"
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
                            "$ref": "#/components/schemas/Bairro"
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
exports.criarBairro = {
    "tags": ['Bairro'],
    "description": "Este endpoint é usado para criar um novo Bairro.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "required": ["codigoMunicipio", "nome", "status"],
                    "properties": {
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
                        }
                    },
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
                            "$ref": "#/components/schemas/Bairro"
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
