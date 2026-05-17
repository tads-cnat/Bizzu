export interface IBeePapelPerfil{
    // id da pessoa que ta fazendo a solicitação
    solicitante?: string;
    
    // Descrição do pq a pessoa deve se tornar moderador
    descricao?: string;

    // Status da alteração de papel da pessoa
    status?: string;
}