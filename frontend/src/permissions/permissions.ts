import { Roles } from "./roles";
import { Types } from "./types";

export const Permissions: Record<string, Partial<Record<Types, Roles[]>>> = {
    '/:username/' : {
        [Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
        [Types.READ] : [Roles.MODERADOR, Roles.INTERNAUTA],
        [Types.UPDATE] : [Roles.MODERADOR, Roles.INTERNAUTA],
        [Types.DELETE] : [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/postagem/criar/' : {
        [Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/editar/:username/' : {
        [Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/feed/' : {
        [Types.READ]: [Roles.MODERADOR, Roles.INTERNAUTA, Roles.VISITANTE],
    },
}

