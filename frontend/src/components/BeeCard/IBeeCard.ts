export interface IBeeCard{
    //Nome da comunidade 
    nome?:string;
    //Descrição da comunidade 
    descricao?: string;
    //O que ocorre quando clicar
    click?: any;
    //Capa do card
    imagem?: React.ReactNode;
}