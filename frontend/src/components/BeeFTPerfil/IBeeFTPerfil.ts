import { IBeeUsuario } from "./IBeeUsuario";

export interface IBeeFTPerfil {
    // texto referente ao nome da pessoa
    usuario: IBeeUsuario
    // props utilizada para fazer a função que vai calcular o tempo da postagem
    dataPublicacao: string;
}