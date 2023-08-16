export const retornarArrayObjetos = <T>(array: any[], propriedades: string[]): T[] => {
    const objetos: T[] = [];
  
    for (const item of array) {
      const objeto: T = {} as T;
      for (let i = 0; i < propriedades.length; i++) {
        objeto[propriedades[i]] = item[i];
      }
      objetos.push(objeto);
    }
  
    return objetos;
}