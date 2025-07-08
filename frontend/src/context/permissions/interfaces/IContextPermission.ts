import { Types } from "../../../permissions/types";

export interface IContextPermission{
    //Permissões do usuário
    permissions: Record<Types, boolean>;
}
