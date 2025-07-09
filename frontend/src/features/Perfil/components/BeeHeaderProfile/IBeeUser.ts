//Interface de retorno da API a outra interface de usuário é para token 

export interface IBeeUser {
    id: number;
    username: string;
    nome: string;
    descricao: string;
    imagemPerfil: string;
    escolaFormacao: string;
    instituicaoAtual: string;
    linkedinUrl?: string
    banner?: string
    criado_em: string;
    segue: number[];
    seguido_por: number[];
}