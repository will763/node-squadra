"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retornarArrayObjetos = void 0;
const retornarArrayObjetos = (array, propriedades) => {
    const objetos = [];
    for (const item of array) {
        const objeto = {};
        for (let i = 0; i < propriedades.length; i++) {
            objeto[propriedades[i]] = item[i];
        }
        objetos.push(objeto);
    }
    return objetos;
};
exports.retornarArrayObjetos = retornarArrayObjetos;
