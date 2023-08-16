export const criarPessoa = {
    "tags": ["Pessoa"],
    "description": "Este endpoint é usado para criar uma nova Pessoa.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
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
                                "type": "object",
                                "properties": {
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
                                        "type": "string"
                                    }
                                },
                                "required": ["codigoBairro", "nomeRua", "numero", "cep"]
                            }
                        }
                    },
                    "required": ["nome", "sobrenome", "idade", "login", "senha", "status", "enderecos"]
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
                            "$ref": "#/components/schemas/Pessoa"
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
}

export const deletarPessoa = {
    "tags": ["Pessoa"],
    "description": "Este endpoint é usado para deletar uma Pessoa.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "codigoPessoa": {
                            "type": "number",
                            "description": "Codigo da Pessoa"
                        },
                    },
                    "required": ["codigoPessoa"]
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
}

export const listarPessoa = {
    "tags": ["Pessoa"],
    "description": "Este endpoint é usado para listar Pessoas.",
    "parameters": [
        {
            "in": "query",
            "name": "codigoPessoa",
            "schema": {
                "type": "number",
                "description": "codigo da Pessoa"
            }
        },
        {
            "in": "query",
            "name": "login",
            "schema": {
                "type": "string",
                "description": "Login da Pessoa"
            }
        },
        {
            "in": "query",
            "name": "status",
            "schema": {
                "type": "number",
                "description": "Status da Pessoa"
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
                            "$ref": "#/components/schemas/Pessoa"
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
}

export const atualizarPessoa = {
    "tags": ["Pessoa"],
    "description": "Este endpoint é usado para atualizar os dados de uma Pessoa.",
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/Pessoa"
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
                            "$ref": "#/components/schemas/Pessoa"
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
}