export type TipoForm = "postagem" | "repositorio" | "editar";

export interface IFormPostagem {
    sendPostagem: (data: any) => void;
    defaultValue?: string;
    defaultComunidade?: string;
    tipoForm: TipoForm;
}
