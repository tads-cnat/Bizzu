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
    '/postagem/editar/:id' : {
        [Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/repositorio/criar/' : {
        [Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/Repositorio/editar/:id' : {
        [Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
    },
    '/' : {
        [Types.READ]: [Roles.MODERADOR, Roles.INTERNAUTA, Roles.VISITANTE],
    },
}

