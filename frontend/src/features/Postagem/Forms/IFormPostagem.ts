export interface IFormPostagem{
    //Função que vai chamar a API 
    sendPostagem: () => {}
    //O que já vem preenchido no campo caso seja de edição o valor já deve vir preechido
    defaultValue?: string;
    //O que já vem preenchido no campo drop de comunidade caso seja de edição o valor já deve vir preechido   
    defaultComunidade?:string;
}

//O tipo de defaultComunidade deve ser alterado quand criar a parte de comunidade 