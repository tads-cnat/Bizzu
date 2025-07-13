export type modalType = "salvar" | "descartar"

export interface IBeeModal{
    //O 'titulo' do modal 
    label?: string;
    //O Texto descritivo que vai aparecer na mensagem do modal 
    text?: string;
    //Qual o modal que você vai querer, isso muda cores e ícones 
    type?: modalType
    // id da postagem ou repositório
    id?: number
    // função utilizada para excluir o post/repositório
    onExcluir?: (id: number) => void
    // Para ele vir aberto em casos que ele é chamado várias vezes 
    openDefault?: boolean
}