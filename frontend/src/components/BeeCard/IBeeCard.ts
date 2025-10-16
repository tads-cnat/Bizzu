export interface IBeeCard{
    //Nome da comunidade 
    title:string;
    //Descrição da comunidade 
    description: string;
    //O que ocorre quando clicar
    click?: any;
    //Capa do card
    cover?: React.ReactNode;
}