//Interface de retorno da API a outra interface de usuário é para token 

export interface IBeeUser{
    // Nome do usuário
    nome: string;
    //Foto de perfil
    imagemPerfil?: File;
    //Quem são os seguidores de um usuário
    segue?: IBeeUser[];
    //ID do usuário
    id?: number
}