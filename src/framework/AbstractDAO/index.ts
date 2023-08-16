export abstract class AbstractDao<T> {
   abstract criar(parametros:T): Promise<void>;
   abstract atualizar(parametros:T):unknown;
   abstract deletar(id:number): unknown;
   abstract listar(parametros:T): Promise<false | unknown[]>
}