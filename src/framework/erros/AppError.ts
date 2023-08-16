class AppError {
    public readonly mensagem: string;
    public readonly status: number;
    public readonly nomeDoCampo: string;
    public readonly tipo: string;

    constructor(mensagem:string, status = 400, nomeDoCampo?:string){
        this.mensagem = mensagem;
        this.status = status;
        this.nomeDoCampo = nomeDoCampo;
    }
}

export default AppError;