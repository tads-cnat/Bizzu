//Interface de retorno da API a outra interface de usuário é para token 

export interface IBeeUser{
    // Nome do usuário
    nome: string;
    //Foto de perfil
    imagemPerfil?: string;
    //Quem são os seguidores de um usuário
    segue?: IBeeUser[];
}