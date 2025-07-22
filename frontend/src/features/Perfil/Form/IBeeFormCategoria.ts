import { Categoria } from "../../../interfaces/IBeeCategoria";

type tipo = "editar" | "criar";

export interface IBeeFormCategoria{
    //O que aparece enciam
    label: string;
    //Caso seja edição
    defaultValues?:  any;
    //O tipo do formulário
    type: tipo;
}