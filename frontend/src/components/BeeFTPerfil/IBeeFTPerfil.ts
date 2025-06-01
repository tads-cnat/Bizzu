import { IBeeUser } from "../BeeHeaderProfile/IBeeUser";

export interface IBeeFTPerfil {
    // texto referente ao nome da pessoa
    usuario: IBeeUser
    // props utilizada para fazer a função que vai calcular o tempo da postagem
    dataPublicacao: string;
}