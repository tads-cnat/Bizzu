export type TipoForm = "criar" | "editar";

export interface IFormPostagem {
    idPostagem?: number;
    tipoForm: TipoForm;
}
