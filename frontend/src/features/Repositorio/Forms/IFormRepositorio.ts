export type TipoForm = "criar" | "editar";

export interface IFormRepositorio {
    idRepositorio?: number;
    tipoForm: TipoForm;
    idUser?:number;
}