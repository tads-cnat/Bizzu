import {Roles} from "./roles";
import {Types} from "./types";

export const Permissions: Record<string, Partial<Record<Types, Roles[]>>> = {
	"/:username/": {
		[Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
		[Types.READ]: [Roles.MODERADOR, Roles.INTERNAUTA],
		[Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
		[Types.DELETE]: [Roles.MODERADOR, Roles.INTERNAUTA],
	},
	"/postagem/criar/": {
		[Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA, Roles.ADMINISTRADOR],
	},
	"/postagem/editar/:id": {
		[Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA, Roles.ADMINISTRADOR],
	},
	"/repositorio/criar/": {
		[Types.CREATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
	},
	"/Repositorio/editar/:id": {
		[Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
	},
	"/": {
		[Types.READ]: [Roles.MODERADOR, Roles.INTERNAUTA, Roles.VISITANTE],
	},
	"repositorio/:id": {
		[Types.READ]: [Roles.MODERADOR, Roles.INTERNAUTA],
		[Types.UPDATE]: [Roles.MODERADOR, Roles.INTERNAUTA],
		[Types.DELETE]: [Roles.MODERADOR, Roles.INTERNAUTA],
	},
	"/comunidade/criar": {
		[Types.CREATE]: [Roles.ADMINISTRADOR],
	},
	"/comunidade/editar/:id": {
		[Types.CREATE]: [Roles.ADMINISTRADOR],
	},
};
