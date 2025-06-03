//Usado para autenticação

export interface IBeeUsuario{
    // texto referente ao nome da pessoa
    username: string;
    // Token de autenticação do usuŕio
    token: string;
    //Id do usuario autenticado 
    id: number;
}
