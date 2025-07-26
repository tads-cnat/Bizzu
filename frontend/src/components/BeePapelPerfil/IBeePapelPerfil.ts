export interface IBeePapelPerfil{
    // id da pessoa que ta fazendo a solicitação
    solicitante?: String;
    
    // Descrição do pq a pessoa deve se tornar moderador
    descricao?: String;

    // Status da alteração de papel da pessoa
    status?: String;
}